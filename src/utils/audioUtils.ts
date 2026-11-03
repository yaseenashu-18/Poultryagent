/**
 * Audio processing utilities for Gemini Live API (gemini-3.8-live)
 * Input: 16kHz PCM 16-bit mono
 * Output: 24kHz PCM 16-bit mono or WAV audio playback
 */

// Convert Float32Array to 16-bit PCM ArrayBuffer and encode as base64
export function floatTo16BitPCMBase64(float32Array: Float32Array): string {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true); // little-endian
  }
  
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Convert Base64 string to ArrayBuffer
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// Play raw 24kHz 16-bit PCM chunk using Web Audio API
export function play24kPCMChunk(
  audioCtx: AudioContext,
  base64Audio: string,
  onEnded?: () => void
): AudioBufferSourceNode {
  const arrayBuffer = base64ToArrayBuffer(base64Audio);
  const int16Array = new Int16Array(arrayBuffer);
  const float32Array = new Float32Array(int16Array.length);

  for (let i = 0; i < int16Array.length; i++) {
    float32Array[i] = int16Array[i] / 32768.0;
  }

  const audioBuffer = audioCtx.createBuffer(1, float32Array.length, 24000);
  audioBuffer.getChannelData(0).set(float32Array);

  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);
  if (onEnded) {
    source.onended = onEnded;
  }
  source.start();
  return source;
}

// Play complete WAV base64 audio
export function playWavBase64(base64Audio: string): Promise<HTMLAudioElement> {
  return new Promise((resolve, reject) => {
    try {
      const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
      audio.onended = () => resolve(audio);
      audio.onerror = (e) => reject(e);
      audio.play().catch(reject);
      resolve(audio);
    } catch (err) {
      reject(err);
    }
  });
}
