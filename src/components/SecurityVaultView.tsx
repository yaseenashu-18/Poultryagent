import React, { useState, useEffect } from 'react';
import { ShieldCheck, MapPin, Building2, Clock, CheckCircle2, PhoneCall, AlertCircle } from 'lucide-react';
import { LostFoundReport } from '../types/campus';

interface SecurityVaultViewProps {
  onSelectReport: (report: LostFoundReport) => void;
  onTriggerCallForReport?: (report: LostFoundReport) => void;
}

export const SecurityVaultView: React.FC<SecurityVaultViewProps> = ({ 
  onSelectReport,
  onTriggerCallForReport,
}) => {
  const [vaultReports, setVaultReports] = useState<LostFoundReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/reports?status=Handover%20to%20Security')
      .then((r) => r.json())
      .then((data) => {
        setVaultReports(data.reports || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Official Campus Security Custody
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">Building C5 Room 102</span>
          </div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Parul University Central Property Vault
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Valuable items (AirPods, wallets, keys, calculators) deposited by students or staff with authorized campus security officers.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs flex items-center gap-3">
          <Building2 className="w-5 h-5 text-[#2563EB] flex-shrink-0" />
          <div>
            <span className="font-bold text-[#0F172A] block">Central Security Post</span>
            <span className="text-[#64748B] text-[11px]">Gate 1 &amp; C5 Admin Ground Floor</span>
          </div>
        </div>
      </div>

      {/* Claim Instructions Guide */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-4 text-xs text-[#1E293B]">
        <h3 className="font-bold text-[#1D4ED8] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4" />
          Campus Item Claim Procedure
        </h3>
        <p className="text-xs text-[#334155] leading-relaxed">
          To collect an item deposited in the vault, visit <strong>Building C5 Room 102</strong> or the assigned Gate security booth. Present your physical <strong>Parul University Student ID card</strong> and the <strong>Security Token number</strong> listed on the report.
        </p>
      </div>

      {/* Vault Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vaultReports.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white border border-[#E2E8F0] rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-[#CBD5E1] mx-auto mb-2" />
            <p className="text-xs text-[#64748B]">No items currently recorded in custody.</p>
          </div>
        ) : (
          vaultReports.map((report) => (
            <div
              key={report.id}
              onClick={() => onSelectReport(report)}
              className="bg-white border border-emerald-200 hover:border-emerald-400 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Secured in Vault
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">#{report.id}</span>
                </div>

                {report.images && report.images.length > 0 && (
                  <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                    <img src={report.images[0]} alt={report.itemName} className="w-full h-full object-cover" />
                  </div>
                )}

                <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                  {report.itemName}
                </h3>

                <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2">
                  {report.description}
                </p>

                {report.securityHandover && (
                  <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 font-mono text-xs">
                    <span className="text-[10px] text-emerald-800 block">SECURITY TOKEN:</span>
                    <strong className="text-emerald-700 block truncate">
                      {report.securityHandover.tokenNumber}
                    </strong>
                    <span className="text-[10px] text-[#64748B] block mt-1 truncate">
                      Cabin: {report.securityHandover.deskLocation}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                <span className="text-[#64748B] text-[11px] font-mono">{report.dateFormatted}</span>
                <div className="flex items-center gap-2">
                  {onTriggerCallForReport && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTriggerCallForReport(report);
                      }}
                      className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                      title="AI Call Claimant for Vault Pickup"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>AI Call Claimant</span>
                    </button>
                  )}
                  <span className="font-bold text-[#2563EB] group-hover:translate-x-0.5 transition-transform">
                    Claim Pass →
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
