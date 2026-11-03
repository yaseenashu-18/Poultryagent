import React, { useState } from 'react';
import { X, Phone, Delete, Hash, Asterisk, Sparkles } from 'lucide-react';
import { FoundifyVertical } from '../types/telephony';
import { ServiceChip } from './ServiceChip';

interface DialerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDial: (phoneNumber: string, vertical?: FoundifyVertical) => void;
}

export const DialerModal: React.FC<DialerModalProps> = ({ isOpen, onClose, onDial }) => {
  const [inputNumber, setInputNumber] = useState<string>('+1 (415) 890-3411');
  const [selectedVertical, setSelectedVertical] = useState<FoundifyVertical>('Lost & Found');

  if (!isOpen) return null;

  const quickHotlines: { name: string; number: string; vertical: FoundifyVertical }[] = [
    { name: 'Lost & Found Recovery', number: '+1 (415) 890-3411', vertical: 'Lost & Found' },
    { name: 'Marketplace Escrow Desk', number: '+1 (415) 890-3412', vertical: 'Marketplace' },
    { name: 'Rentals Smart Lock Desk', number: '+1 (512) 600-8840', vertical: 'Rentals' },
    { name: 'Emergency Services Dispatch', number: '+1 (206) 400-9122', vertical: 'Services' },
    { name: 'Giveaways Community Desk', number: '+1 (718) 390-1105', vertical: 'Giveaways' },
  ];

  const handleDigit = (digit: string) => {
    setInputNumber((prev) => prev + digit);
  };

  const handleBackspace = () => {
    setInputNumber((prev) => prev.slice(0, -1));
  };

  const handleSelectHotline = (hotline: { number: string; vertical: FoundifyVertical }) => {
    setInputNumber(hotline.number);
    setSelectedVertical(hotline.vertical);
  };

  const handleCall = () => {
    onDial(inputNumber, selectedVertical);
    onClose();
  };

  const keys = [
    { num: '1', sub: '' },
    { num: '2', sub: 'ABC' },
    { num: '3', sub: 'DEF' },
    { num: '4', sub: 'GHI' },
    { num: '5', sub: 'JKL' },
    { num: '6', sub: 'MNO' },
    { num: '7', sub: 'PQRS' },
    { num: '8', sub: 'TUV' },
    { num: '9', sub: 'WXYZ' },
    { num: '*', sub: '' },
    { num: '0', sub: '+' },
    { num: '#', sub: '' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-[#CBD5E1] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="h-12 px-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#2563EB]" />
            <span className="text-xs font-semibold text-[#0F172A]">Telephony Keypad Dialer</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-md text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Display Screen */}
        <div className="p-4 bg-[#F8FAFC] border-b border-[#E2E8F0] text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <ServiceChip vertical={selectedVertical} size="sm" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value)}
              className="text-center font-mono text-xl font-bold text-[#0F172A] tracking-wider bg-transparent focus:outline-none w-full tabular-nums"
            />
            {inputNumber && (
              <button
                onClick={handleBackspace}
                className="text-[#94A3B8] hover:text-[#EF4444] transition-colors p-1"
              >
                <Delete className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-[11px] font-mono text-[#64748B] mt-1">Carrier Route: WebRTC Full-Duplex</p>
        </div>

        {/* Quick Hotlines Drawer */}
        <div className="p-3 border-b border-[#E2E8F0] bg-white">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] block mb-1.5">
            Quick Vertical Hotlines
          </span>
          <div className="space-y-1">
            {quickHotlines.map((h) => (
              <button
                key={h.number}
                onClick={() => handleSelectHotline(h)}
                className={`w-full text-left p-1.5 rounded-md text-xs flex items-center justify-between transition-colors ${
                  inputNumber === h.number ? 'bg-[#EFF6FF] border border-[#BFDBFE]' : 'hover:bg-[#F8FAFC]'
                }`}
              >
                <span className="font-medium text-[#1E293B]">{h.name}</span>
                <span className="font-mono text-[11px] text-[#64748B]">{h.number}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 12-Key Pad */}
        <div className="p-4 bg-white grid grid-cols-3 gap-2">
          {keys.map((k) => (
            <button
              key={k.num}
              onClick={() => handleDigit(k.num)}
              className="h-12 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] active:bg-[#E2E8F0] text-[#0F172A] flex flex-col items-center justify-center transition-all select-none border border-[#E2E8F0]"
            >
              <span className="font-mono text-base font-semibold">{k.num}</span>
              {k.sub && <span className="text-[9px] font-mono text-[#94A3B8] leading-none">{k.sub}</span>}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="p-4 pt-0 bg-white">
          <button
            onClick={handleCall}
            disabled={!inputNumber}
            className="w-full h-11 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-slate-300 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Connect Voice AI Agent</span>
          </button>
        </div>
      </div>
    </div>
  );
};
