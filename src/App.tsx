/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlatformSidebar, PlatformTab } from './components/PlatformSidebar';
import { PlatformHeader } from './components/PlatformHeader';
import { CampusTelephonyHub } from './components/CampusTelephonyHub';
import { OutboundCallQueue } from './components/OutboundCallQueue';
import { CallRecords } from './components/CallRecords';
import { CallInspectorDrawer } from './components/CallInspectorDrawer';
import { CampusDatabaseView } from './components/CampusDatabaseView';
import { SecurityVaultView } from './components/SecurityVaultView';
import { AgentPersonaStudio } from './components/AgentPersonaStudio';
import { PhoneManager } from './components/PhoneManager';
import { DialerModal } from './components/DialerModal';
import { ReportDetailModal } from './components/ReportDetailModal';
import { NewReportModal } from './components/NewReportModal';
import { 
  INITIAL_CALL_RECORDS, 
  INITIAL_OUTBOUND_QUEUE,
  PHONE_NUMBERS 
} from './data/mockTelephonyData';
import { CallRecord, HumanVoiceName, OutboundQueueItem, PhoneNumberRecord } from './types/telephony';
import { LostFoundReport } from './types/campus';

export default function App() {
  const [activeTab, setActiveTab] = useState<PlatformTab>('telephony');
  const [queue, setQueue] = useState<OutboundQueueItem[]>(INITIAL_OUTBOUND_QUEUE);
  const [callRecords, setCallRecords] = useState<CallRecord[]>(INITIAL_CALL_RECORDS);
  const [selectedVoice, setSelectedVoice] = useState<HumanVoiceName>('Zephyr');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'te'>('en');
  const [isCallLive, setIsCallLive] = useState<boolean>(false);
  const [isDialerOpen, setIsDialerOpen] = useState<boolean>(false);
  const [selectedCallForDrawer, setSelectedCallForDrawer] = useState<CallRecord | null>(null);
  const [selectedReportForModal, setSelectedReportForModal] = useState<LostFoundReport | null>(null);
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState<boolean>(false);

  // Active call target passed to CampusTelephonyHub
  const [callTarget, setCallTarget] = useState<{
    phone: string;
    studentName: string;
    scenario: 'match_alert' | 'security_vault' | 'custom';
    autoStart: boolean;
  }>({
    phone: '+91 98765 43210',
    studentName: 'Rohan Patel',
    scenario: 'match_alert',
    autoStart: false,
  });

  // 1. Dispatch an outbound call from the queue directly to a student
  const handleInitiateCallToStudent = (item: OutboundQueueItem) => {
    setCallTarget({
      phone: item.phone,
      studentName: item.studentName,
      scenario: item.scenarioType,
      autoStart: true,
    });
    setSelectedVoice(item.assignedVoice);
    setSelectedLanguage(item.language);
    setActiveTab('telephony');
  };

  // 2. Dispatch the top-ranked match in the outbound queue
  const handleBatchDispatch = () => {
    if (queue.length > 0) {
      const top = queue[0];
      handleInitiateCallToStudent(top);
    }
  };

  // 3. Dial from keypad
  const handleDialFromKeypad = (
    phoneNumber: string, 
    studentName?: string, 
    scenario?: 'match_alert' | 'security_vault' | 'custom'
  ) => {
    setCallTarget({
      phone: phoneNumber,
      studentName: studentName || 'Student',
      scenario: scenario || 'custom',
      autoStart: true,
    });
    setActiveTab('telephony');
  };

  // 4. Trigger AI verification call from a report in the database or vault
  const handleTriggerCallFromReport = (report: LostFoundReport) => {
    const isVault = report.status === 'Handover to Security';
    setCallTarget({
      phone: '+91 98765 43210',
      studentName: report.reportedBy.name,
      scenario: isVault ? 'security_vault' : 'match_alert',
      autoStart: true,
    });
    setActiveTab('telephony');
  };

  // 5. Test carrier line from DID manager
  const handleTestNumber = (number: PhoneNumberRecord) => {
    setCallTarget({
      phone: number.number,
      studentName: number.assignedAgent,
      scenario: 'custom',
      autoStart: true,
    });
    setActiveTab('telephony');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
      {/* Platform Navigation Sidebar */}
      <PlatformSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        queueCount={queue.filter((q) => q.status === 'Queued').length}
        isCallLive={isCallLive}
      />

      {/* Main Execution Canvas */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Sticky SaaS Top Bar Contract Header */}
        <PlatformHeader
          onOpenDialer={() => setIsDialerOpen(true)}
          onQuickOutbound={() => {
            if (queue.length > 0) {
              handleInitiateCallToStudent(queue[0]);
            } else {
              setIsDialerOpen(true);
            }
          }}
          onQuickInbound={() => {
            setCallTarget({
              phone: '+91 (2668) 260-312',
              studentName: 'Parul University Helpline Ext 102',
              scenario: 'custom',
              autoStart: false,
            });
            setActiveTab('telephony');
          }}
          isCallLive={isCallLive}
          activeCallsCount={callRecords.filter((c) => c.status === 'Live').length}
        />

        {/* Scrollable Viewport Canvas */}
        <main className="flex-1 overflow-y-auto p-6 max-w-[1500px] w-full mx-auto">
          {activeTab === 'telephony' && (
            <CampusTelephonyHub
              initialTargetPhone={callTarget.phone}
              initialStudentName={callTarget.studentName}
              initialScenario={callTarget.scenario}
              autoStartCall={callTarget.autoStart}
              activeVoice={selectedVoice}
              activeLanguage={selectedLanguage}
              onCallStateChange={(live) => setIsCallLive(live)}
            />
          )}

          {activeTab === 'queue' && (
            <OutboundCallQueue
              queue={queue}
              onInitiateCallToStudent={handleInitiateCallToStudent}
              onBatchDispatch={handleBatchDispatch}
              isCallLive={isCallLive}
            />
          )}

          {activeTab === 'records' && (
            <CallRecords
              calls={callRecords}
              onSelectCall={(call) => setSelectedCallForDrawer(call)}
            />
          )}

          {activeTab === 'registry' && (
            <CampusDatabaseView
              onSelectReport={(report) => setSelectedReportForModal(report)}
              onOpenNewReportModal={() => setIsNewReportModalOpen(true)}
              onTriggerCallForReport={handleTriggerCallFromReport}
            />
          )}

          {activeTab === 'security' && (
            <SecurityVaultView
              onSelectReport={(report) => setSelectedReportForModal(report)}
              onTriggerCallForReport={handleTriggerCallFromReport}
            />
          )}

          {activeTab === 'persona' && (
            <AgentPersonaStudio
              currentVoice={selectedVoice}
              onVoiceChange={(v) => setSelectedVoice(v)}
              currentLanguage={selectedLanguage}
              onLanguageChange={(l) => setSelectedLanguage(l)}
            />
          )}

          {activeTab === 'dids' && (
            <PhoneManager
              onTestNumber={handleTestNumber}
            />
          )}
        </main>
      </div>

      {/* Keypad Phone Dialer Modal */}
      <DialerModal
        isOpen={isDialerOpen}
        onClose={() => setIsDialerOpen(false)}
        onDial={handleDialFromKeypad}
      />

      {/* Historical Call Drawer & Audio Inspector */}
      <CallInspectorDrawer
        call={selectedCallForDrawer}
        onClose={() => setSelectedCallForDrawer(null)}
      />

      {/* Report Detail & Claim Pass Modal */}
      <ReportDetailModal
        report={selectedReportForModal}
        onClose={() => setSelectedReportForModal(null)}
        onStatusUpdate={(id, status) => {
          if (selectedReportForModal && selectedReportForModal.id === id) {
            setSelectedReportForModal({
              ...selectedReportForModal,
              status: status as any,
            });
          }
        }}
      />

      {/* New Campus Report Intake Modal */}
      <NewReportModal
        isOpen={isNewReportModalOpen}
        onClose={() => setIsNewReportModalOpen(false)}
        onReportCreated={(newReport) => setSelectedReportForModal(newReport)}
      />
    </div>
  );
}
