import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Modality } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Human Voice options available in Gemini
// Zephyr (Warm & Professional), Kore (Calm & Clear), Puck (Friendly & Dynamic), Charon (Authoritative & Deep), Fenrir (Crisp & Direct)
const VALID_HUMAN_VOICES = ['Zephyr', 'Kore', 'Puck', 'Charon', 'Fenrir', 'Aoede'];

/**
 * Endpoint: /api/tts
 * Synthesizes high-fidelity human voice audio via Gemini TTS
 */
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice = 'Zephyr', style = 'Clear, professional customer service operator' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text prompt is required' });
    }

    const selectedVoice = VALID_HUMAN_VOICES.includes(voice) ? voice : 'Zephyr';

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text,
              speechMetadata: {
                style: style,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: selectedVoice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'No audio returned from speech synthesis model' });
    }

    return res.json({
      audio: base64Audio,
      mimeType: 'audio/wav',
      voice: selectedVoice,
    });
  } catch (err: any) {
    console.error('Error generating speech via Gemini TTS:', err?.message || err);
    return res.status(500).json({
      error: 'Speech generation failed',
      details: err?.message || 'Unknown error',
    });
  }
});

/**
 * Endpoint: /api/agent/chat
 * Generates an intelligent vertical telephony response and also synthesizes human voice audio
 */
app.post('/api/agent/chat', async (req, res) => {
  try {
    const { 
      message, 
      vertical = 'Lost & Found', 
      systemPrompt, 
      voice = 'Zephyr',
      history = [] 
    } = req.body;

    const selectedVoice = VALID_HUMAN_VOICES.includes(voice) ? voice : 'Zephyr';

    const defaultInstructions = systemPrompt || `You are the Foundify Voice AI Agent specializing in ${vertical}.
Keep your responses succinct, conversational, professional, and natural for voice telephony (1 to 2 sentences max).
Do not use markdown formatting, bullets, asterisks, or citations, as this will be read aloud over low-latency telephony.`;

    const contents = [
      ...history.map((h: { speaker: string; text: string }) => ({
        role: h.speaker === 'agent' ? 'model' : 'user',
        parts: [{ text: h.text }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    // 1. Generate text response
    const textGenResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: defaultInstructions,
      },
    });

    const replyText = textGenResponse.text?.trim() || 'I have processed your request and updated the Foundify ledger.';

    // 2. Synthesize Human Voice using Gemini TTS
    let base64Audio: string | null = null;
    try {
      const ttsResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: replyText,
                speechMetadata: {
                  style: `Professional, calm telephony voice for ${vertical}`,
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice },
            },
          },
        },
      });

      base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
    } catch (ttsErr: any) {
      console.warn('TTS generation fallback:', ttsErr?.message);
    }

    return res.json({
      text: replyText,
      audio: base64Audio,
      mimeType: 'audio/wav',
      voice: selectedVoice,
    });
  } catch (err: any) {
    console.error('Error in agent chat:', err);
    return res.status(500).json({ error: err?.message || 'Chat processing error' });
  }
});

// Setup WebSocket for Gemini Live API (gemini-3.8-live)
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  const url = new URL(request.url || '', `http://${request.headers.host}`);
  if (url.pathname === '/api/live') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

wss.on('connection', async (clientWs, request) => {
  console.log('Client connected to Gemini Live API WebSocket');
  const url = new URL(request.url || '', `http://${request.headers.host}`);
  const requestedVoice = url.searchParams.get('voice') || 'Zephyr';
  const requestedVertical = url.searchParams.get('vertical') || 'Lost & Found';
  const voiceName = VALID_HUMAN_VOICES.includes(requestedVoice) ? requestedVoice : 'Zephyr';

  let liveSession: any = null;

  try {
    liveSession = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
        },
        systemInstruction: `You are the Foundify Real-Time Telephony Voice Agent for ${requestedVertical}.
Speak with an authentic, friendly human voice. Keep answers concise, natural, and conversational for telephony. Do not list numbers or bullet points. Act immediately to help with claims, orders, rental locks, emergency dispatch, or community giveaways.`,
      },
      callbacks: {
        onmessage: (message: any) => {
          // Model returned audio parts
          for (const part of message.serverContent?.modelTurn?.parts ?? []) {
            if (part.inlineData?.data) {
              if (clientWs.readyState === WebSocket.OPEN) {
                clientWs.send(JSON.stringify({ 
                  type: 'audio', 
                  audio: part.inlineData.data 
                }));
              }
            }
            if (part.text) {
              if (clientWs.readyState === WebSocket.OPEN) {
                clientWs.send(JSON.stringify({ 
                  type: 'text', 
                  text: part.text 
                }));
              }
            }
          }

          if (message.serverContent?.interrupted) {
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ type: 'interrupted' }));
            }
          }

          if (message.serverContent?.turnComplete) {
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ type: 'turnComplete' }));
            }
          }
        },
        onerror: (err: any) => {
          console.error('Gemini Live API error:', err);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'error', error: err?.message || 'Live session error' }));
          }
        },
        onclose: () => {
          console.log('Gemini Live session closed');
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'sessionClosed' }));
          }
        },
      },
    });

    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ 
        type: 'ready', 
        message: 'Gemini Live session established with human voice', 
        voice: voiceName 
      }));
    }
  } catch (err: any) {
    console.error('Failed to connect to Gemini Live API:', err);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ 
        type: 'error', 
        error: err?.message || 'Could not connect to Gemini Live' 
      }));
    }
  }

  clientWs.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg.type === 'audio' && msg.audio && liveSession) {
        liveSession.sendRealtimeInput({
          audio: { data: msg.audio, mimeType: 'audio/pcm;rate=16000' },
        });
      } else if (msg.type === 'text' && msg.text && liveSession) {
        liveSession.sendRealtimeInput({
          text: msg.text,
        });
      }
    } catch (parseErr) {
      console.error('Error handling client message:', parseErr);
    }
  });

  clientWs.on('close', () => {
    console.log('Client disconnected from Gemini Live API');
    try {
      if (liveSession?.close) {
        liveSession.close();
      }
    } catch (closeErr) {
      // Ignore
    }
  });
});

// Mount Vite in dev mode or serve dist in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(port, () => {
    console.log(`Foundify Voice AI server running on port ${port} (mode: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
