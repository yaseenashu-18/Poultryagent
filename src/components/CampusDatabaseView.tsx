import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Building2, 
  Plus, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  ArrowUpDown,
  Tag,
  MapPin,
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { LostFoundReport, CampusLocation } from '../types/campus';
import { PARUL_CAMPUS_LOCATIONS } from '../data/parulCampusData';

interface CampusDatabaseViewProps {
  onSelectReport: (report: LostFoundReport) => void;
  onOpenNewReportModal: () => void;
  onTriggerCallForReport?: (report: LostFoundReport) => void;
}

export const CampusDatabaseView: React.FC<CampusDatabaseViewProps> = ({
  onSelectReport,
  onOpenNewReportModal,
  onTriggerCallForReport,
}) => {
  const [reports, setReports] = useState<LostFoundReport[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'all' | 'lost' | 'found'>('all');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      let url = '/api/reports?';
      if (selectedType !== 'all') url += `type=${selectedType}&`;
      if (selectedBuilding !== 'all') url += `building=${encodeURIComponent(selectedBuilding)}&`;
      if (selectedStatus !== 'all') url += `status=${encodeURIComponent(selectedStatus)}&`;
      if (searchQuery.trim()) url += `search=${encodeURIComponent(searchQuery.trim())}&`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
      }
    } catch (e) {
      console.error('Error fetching reports:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [selectedType, selectedBuilding, selectedStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReports();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Parul University Campus Registry
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
              Live Database
            </span>
          </div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Lost & Found Belongings Registry
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Verified campus listings across engineering, pharmacy, library, food courts, and hostel zones.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchReports}
            className="h-9 px-3 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#475569] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={onOpenNewReportModal}
            className="h-9 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Campus Report</span>
          </button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search calculator, AirPods, wallet, college ID, building name..."
              className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <button
            type="submit"
            className="h-10 px-4 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Search Registry
          </button>
        </form>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F1F5F9] text-xs">
          {/* Type Toggle */}
          <div className="flex items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-1">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                selectedType === 'all' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-[#64748B]'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setSelectedType('lost')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                selectedType === 'lost' ? 'bg-amber-600 text-white shadow-xs' : 'text-[#64748B]'
              }`}
            >
              Lost Only
            </button>
            <button
              onClick={() => setSelectedType('found')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                selectedType === 'found' ? 'bg-emerald-600 text-white shadow-xs' : 'text-[#64748B]'
              }`}
            >
              Found Only
            </button>
          </div>

          {/* Building Selector */}
          <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg text-[#475569]">
            <Building2 className="w-3.5 h-3.5 text-[#64748B]" />
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Campus Buildings</option>
              {PARUL_CAMPUS_LOCATIONS.map((loc) => (
                <option key={loc.code} value={loc.code}>
                  [{loc.code}] {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Selector */}
          <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg text-[#475569]">
            <Filter className="w-3.5 h-3.5 text-[#64748B]" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Reported">Reported</option>
              <option value="Under Review">Under Review</option>
              <option value="Matched">Matched</option>
              <option value="Handover to Security">Handover to Security</option>
              <option value="Recovered">Recovered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white border border-[#E2E8F0] rounded-2xl">
            <Building2 className="w-10 h-10 text-[#CBD5E1] mx-auto mb-2" />
            <h3 className="text-sm font-bold text-[#0F172A]">No Parul University Reports Found</h3>
            <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
              No active lost or found records match your filter criteria. Try searching a different building or query.
            </p>
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              onClick={() => onSelectReport(report)}
              className="bg-white border border-[#E2E8F0] hover:border-[#2563EB] rounded-2xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Header Tag & ID */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        report.type === 'found'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {report.type === 'found' ? 'Found Item' : 'Lost Item'}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">#{report.id}</span>
                  </div>

                  {report.securityHandover?.isHandedOver && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      In Security Vault
                    </span>
                  )}
                </div>

                {/* Image & Title */}
                {report.images && report.images.length > 0 && (
                  <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-100 border border-[#F1F5F9] mb-3">
                    <img
                      src={report.images[0]}
                      alt={report.itemName}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                )}

                <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-[#2563EB] transition-colors line-clamp-1">
                  {report.itemName}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-[#475569] mt-1">
                  <Building2 className="w-3.5 h-3.5 text-[#2563EB] flex-shrink-0" />
                  <span className="truncate font-medium">
                    [{report.location.buildingCode}] {report.location.buildingName}
                  </span>
                </div>

                <p className="text-xs text-[#64748B] mt-2 line-clamp-2 leading-relaxed">
                  {report.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-[#94A3B8]">
                  {report.dateFormatted}
                </span>

                <div className="flex items-center gap-2">
                  {onTriggerCallForReport && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTriggerCallForReport(report);
                      }}
                      className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                      title="Dispatch AI Call to verify item"
                    >
                      <PhoneCall className="w-3 h-3 text-emerald-700" />
                      <span>AI Call</span>
                    </button>
                  )}
                  <span className="font-bold text-[#2563EB] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
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
