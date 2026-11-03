/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { Header } from './components/Header';
import { LiveCallStudio } from './components/LiveCallStudio';
import { CallRecords } from './components/CallRecords';
import { CallInspectorDrawer } from './components/CallInspectorDrawer';
import { PromptSandbox } from './components/PromptSandbox';
import { TelemetryDashboard } from './components/TelemetryDashboard';
import { PhoneManager } from './components/PhoneManager';
import { DialerModal } from './components/DialerModal';
import { FoundifyVertical, CallRecord, PhoneNumberRecord } from './types/telephony';
import { INITIAL_CALL_RECORDS } from './data/mockTelephonyData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('studio');
  const [selectedVertical, setSelectedVertical] = useState<FoundifyVertical | 'All'>('Lost & Found');
  const [calls, setCalls] = useState<CallRecord[]>(INITIAL_CALL_RECORDS);
  const [selectedCallForInspect, setSelectedCallForInspect] = useState<CallRecord | null>(null);
  const [isDialerOpen, setIsDialerOpen] = useState<boolean>(false);
  const [isCallLive, setIsCallLive] = useState<boolean>(false);

  // Active vertical for Live Studio (if 'All' is selected in filter, default to Lost & Found)
  const studioVertical: FoundifyVertical =
    selectedVertical === 'All' ? 'Lost & Found' : selectedVertical;

  const handleSelectVertical = (vert: FoundifyVertical | 'All') => {
    setSelectedVertical(vert);
  };

  const handleQuickSimulate = () => {
    setActiveTab('studio');
    setIsCallLive(true);
  };

  const handleTestPrompt = (vertical: FoundifyVertical) => {
    setSelectedVertical(vertical);
    setActiveTab('studio');
    setIsCallLive(true);
  };

  const handleTestNumber = (number: PhoneNumberRecord) => {
    setSelectedVertical(number.vertical);
    setActiveTab('studio');
    setIsCallLive(true);
  };

  const handleDialFromModal = (phone: string, vert?: FoundifyVertical) => {
    if (vert) {
      setSelectedVertical(vert);
    }
    setActiveTab('studio');
    setIsCallLive(true);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC] text-[#0F172A]">
      {/* 240px Utility Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        selectedVertical={selectedVertical}
        onSelectVertical={handleSelectVertical}
        activeCallsCount={6}
        isCallLive={isCallLive}
      />

      {/* Main Execution Canvas */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Sticky Operational Header */}
        <Header
          onOpenDialer={() => setIsDialerOpen(true)}
          onQuickSimulate={handleQuickSimulate}
          selectedVertical={selectedVertical}
          isCallLive={isCallLive}
          activeCallsCount={6}
        />

        {/* Scrollable Viewport Canvas */}
        <main className="flex-1 overflow-y-auto p-6 max-w-[1600px] w-full mx-auto">
          {activeTab === 'studio' && (
            <LiveCallStudio
              currentVertical={studioVertical}
              onChangeVertical={(v) => setSelectedVertical(v)}
              isCallLive={isCallLive}
              setIsCallLive={setIsCallLive}
            />
          )}

          {activeTab === 'records' && (
            <CallRecords
              calls={calls}
              onSelectCall={setSelectedCallForInspect}
              selectedVertical={selectedVertical}
              onSelectVertical={handleSelectVertical}
            />
          )}

          {activeTab === 'prompt' && (
            <PromptSandbox onTestPrompt={handleTestPrompt} />
          )}

          {activeTab === 'telemetry' && (
            <TelemetryDashboard onSelectVertical={handleSelectVertical} />
          )}

          {activeTab === 'dids' && (
            <PhoneManager onTestNumber={handleTestNumber} />
          )}
        </main>
      </div>

      {/* Slide-over Call Inspector Drawer */}
      <CallInspectorDrawer
        call={selectedCallForInspect}
        onClose={() => setSelectedCallForInspect(null)}
      />

      {/* Interactive Keypad Dialer Modal */}
      <DialerModal
        isOpen={isDialerOpen}
        onClose={() => setIsDialerOpen(false)}
        onDial={handleDialFromModal}
      />
    </div>
  );
}
