import React, { useState } from 'react';
import { 
  Play, 
  Save, 
  RotateCcw, 
  Check, 
  Sliders, 
  Sparkles, 
  ShieldCheck, 
  Wrench,
  Radio,
  ArrowRight
} from 'lucide-react';
import { FoundifyVertical, AgentPromptConfig } from '../types/telephony';
import { SYSTEM_PROMPTS } from '../data/mockTelephonyData';
import { ServiceChip } from './ServiceChip';

interface PromptSandboxProps {
  onTestPrompt: (vertical: FoundifyVertical) => void;
}

export const PromptSandbox: React.FC<PromptSandboxProps> = ({ onTestPrompt }) => {
  const [selectedVertical, setSelectedVertical] = useState<FoundifyVertical>('Lost & Found');
  const [prompts, setPrompts] = useState<Record<string, AgentPromptConfig>>(SYSTEM_PROMPTS);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const currentConfig = prompts[selectedVertical] || SYSTEM_PROMPTS['Lost & Found'];

  const handlePromptTextChange = (text: string) => {
    setPrompts((prev) => ({
      ...prev,
      [selectedVertical]: {
        ...prev[selectedVertical],
        systemPrompt: text,
      },
    }));
    setIsSaved(false);
  };

  const handleUpdateConfig = <K extends keyof AgentPromptConfig>(
    key: K,
    value: AgentPromptConfig[K]
  ) => {
    setPrompts((prev) => ({
      ...prev,
      [selectedVertical]: {
        ...prev[selectedVertical],
        [key]: value,
      },
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2400);
  };

  const handleReset = () => {
    setPrompts((prev) => ({
      ...prev,
      [selectedVertical]: { ...SYSTEM_PROMPTS[selectedVertical] },
    }));
    setIsSaved(false);
  };

  // Generate line numbers for the code textarea
  const lines = currentConfig.systemPrompt.split('\n');

  const availableTools = [
    { id: 'queryCustodyVault', label: 'Vault Inventory Lookup', desc: 'Real-time query into Foundify physical custody vault' },
    { id: 'sendSmsVerification', label: 'Dispatched Claim Link (SMS)', desc: 'Sends one-time retrieval pass to caller mobile' },
    { id: 'releaseEscrowBalance', label: 'Instant Escrow Settlement', desc: 'Pushes verified buyer/seller funds via Stripe' },
    { id: 'cycleSmartLockPin', label: 'Smart Lock Token Cycle', desc: 'Interfaces with Schlage / Yale IoT hubs' },
    { id: 'lookupNearestPro', label: 'Emergency Pro Dispatch', desc: 'Geo-locates nearest active contractor with live ETA' },
    { id: 'publishGiveawayListing', label: 'Community Blast Notification', desc: 'Publishes free items to verified local radius' },
  ];

  const verticals: FoundifyVertical[] = [
    'Lost & Found',
    'Marketplace',
    'Rentals',
    'Services',
    'Giveaways',
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar: Vertical Presets & Actions */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Voice Prompt Architecture
              </span>
              <ServiceChip vertical={selectedVertical} size="sm" />
            </div>
            <h2 className="text-lg font-semibold text-[#0F172A] tracking-tight">
              {currentConfig.title}
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Configured for sub-200ms TTFB carrier telephony execution.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="h-9 px-3 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#475569] text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Template</span>
            </button>

            <button
              onClick={handleSave}
              className="h-9 px-3.5 bg-white border border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Save className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'Version Deployed' : 'Save Version'}</span>
            </button>

            <button
              onClick={() => onTestPrompt(selectedVertical)}
              className="h-9 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all active:scale-98"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Test in Live Studio</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>

        {/* Vertical Tabs */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#F1F5F9] overflow-x-auto">
          {verticals.map((vert) => (
            <button
              key={vert}
              onClick={() => {
                setSelectedVertical(vert);
                setIsSaved(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex-shrink-0 ${
                selectedVertical === vert
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9]'
              }`}
            >
              {vert}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Parameter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Rich Monospaced System Prompt Sandbox with Line Numbering Column in #F8FAFC */}
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-xl shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] overflow-hidden flex flex-col h-[600px]">
          {/* Editor Header */}
          <div className="h-10 px-4 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
              <span>System Prompt (Instructions)</span>
              <span className="font-mono text-[10px] text-[#64748B] bg-white border border-[#E2E8F0] px-1.5 py-0.5 rounded">
                JetBrains Mono · UTF-8
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#64748B]">
              {lines.length} Lines · {currentConfig.systemPrompt.length} chars
            </span>
          </div>

          {/* Editor Body with line numbering column */}
          <div className="flex-1 flex overflow-hidden">
            {/* Line Number Column in #F8FAFC with #94A3B8 numerals */}
            <div className="w-12 bg-[#F8FAFC] border-r border-[#E2E8F0] py-3 select-none text-right pr-3 font-mono text-[12px] leading-6 text-[#94A3B8]">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Editable Textarea */}
            <textarea
              value={currentConfig.systemPrompt}
              onChange={(e) => handlePromptTextChange(e.target.value)}
              spellCheck={false}
              className="flex-1 p-3 bg-white font-mono text-[12px] leading-6 text-[#0F172A] resize-none focus:outline-none focus:ring-0 overflow-y-auto"
            />
          </div>

          {/* Editor Footer */}
          <div className="h-9 px-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between text-xs text-[#64748B]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>Synthesizer Ready: Barge-in Active</span>
            </div>
            <span className="font-mono text-[11px]">Target Latency: {currentConfig.latencyTargetMs}ms</span>
          </div>
        </div>

        {/* Right: Telephony Parameters & Tools */}
        <div className="lg:col-span-4 space-y-4">
          {/* Telephony Tuning Panel */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F1F5F9]">
              <Sliders className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider">
                Acoustic & Model Tuning
              </h3>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#475569]">Sampling Temperature</span>
                <span className="font-mono font-semibold text-[#0F172A]">{currentConfig.temperature}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={currentConfig.temperature}
                onChange={(e) => handleUpdateConfig('temperature', parseFloat(e.target.value))}
                className="w-full accent-[#2563EB] cursor-pointer"
              />
              <p className="text-[11px] text-[#94A3B8]">
                Lower values ensure strict procedural item intake adherence.
              </p>
            </div>

            {/* Speech Rate Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#475569]">Speech Cadence (Rate)</span>
                <span className="font-mono font-semibold text-[#0F172A]">{currentConfig.speechRate}x</span>
              </div>
              <input
                type="range"
                min="0.85"
                max="1.25"
                step="0.05"
                value={currentConfig.speechRate}
                onChange={(e) => handleUpdateConfig('speechRate', parseFloat(e.target.value))}
                className="w-full accent-[#2563EB] cursor-pointer"
              />
              <p className="text-[11px] text-[#94A3B8]">
                1.0x to 1.1x optimizes conversational pacing and responsiveness.
              </p>
            </div>

            {/* Barge-In Interruption Sensitivity */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#475569]">Barge-In Sensitivity</span>
                <span className="font-mono font-semibold text-[#10B981]">{currentConfig.bargeInSensitivity}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                step="5"
                value={currentConfig.bargeInSensitivity}
                onChange={(e) => handleUpdateConfig('bargeInSensitivity', parseInt(e.target.value, 10))}
                className="w-full accent-[#10B981] cursor-pointer"
              />
              <p className="text-[11px] text-[#94A3B8]">
                Determines how promptly the AI yields audio when the caller speaks.
              </p>
            </div>

            {/* Voice Actor / Persona */}
            <div className="space-y-1.5 pt-2 border-t border-[#F1F5F9]">
              <label className="text-xs font-medium text-[#475569] block">
                Selected Voice Persona
              </label>
              <select
                value={currentConfig.selectedVoice}
                onChange={(e) => handleUpdateConfig('selectedVoice', e.target.value)}
                className="w-full h-9 px-2.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="Zephyr (Warm & Professional Human Voice)">Zephyr (Warm & Professional Human Voice)</option>
                <option value="Kore (Calm & Clear Human Voice)">Kore (Calm & Clear Human Voice)</option>
                <option value="Puck (Friendly & Dynamic Human Voice)">Puck (Friendly & Dynamic Human Voice)</option>
                <option value="Charon (Authoritative & Deep Human Voice)">Charon (Authoritative & Deep Human Voice)</option>
                <option value="Fenrir (Crisp & Direct Human Voice)">Fenrir (Crisp & Direct Human Voice)</option>
                <option value="Aoede (Expressive & Melodic Human Voice)">Aoede (Expressive & Melodic Human Voice)</option>
              </select>
            </div>
          </div>

          {/* Enabled Operational Function Tools */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-[0_1px_2px_0_rgba(15,23,42,0.04)] space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-[#F1F5F9]">
              <Wrench className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider">
                Integrated Carrier Tools
              </h3>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto">
              {availableTools.map((t) => {
                const isEnabled = currentConfig.toolsEnabled.includes(t.id);
                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      const updated = isEnabled
                        ? currentConfig.toolsEnabled.filter((id) => id !== t.id)
                        : [...currentConfig.toolsEnabled, t.id];
                      handleUpdateConfig('toolsEnabled', updated);
                    }}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      isEnabled
                        ? 'bg-[#EFF6FF] border-[#BFDBFE]'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#0F172A]">{t.label}</span>
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        readOnly
                        className="rounded text-[#2563EB] accent-[#2563EB]"
                      />
                    </div>
                    <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">{t.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
