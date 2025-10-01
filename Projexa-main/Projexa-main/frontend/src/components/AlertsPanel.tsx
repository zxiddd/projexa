import React from "react";

export type AlertItem = {
  id: string;
  severity: "low" | "medium" | "high";
  message: string;
  projectId?: string;
};

type AlertsPanelProps = {
  alerts: AlertItem[];
};

// All-blue palette variants
const severityStyles: Record<AlertItem["severity"], string> = {
  low: "bg-[#035096]/5 text-[#035096] ring-1 ring-[#035096]/15",
  medium: "bg-[#035096]/10 text-[#035096] ring-1 ring-[#035096]/20",
  high: "bg-[#035096]/15 text-[#035096] ring-1 ring-[#035096]/30",
};

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-[#035096]">AI Risk Alerts</h3>
        <span className="text-xs text-gray-500">{alerts.length} alerts</span>
      </div>
      <div className="flex flex-col gap-2">
        {alerts.map((a) => (
          <div key={a.id} className={`px-3 py-2 rounded ${severityStyles[a.severity]} hover:ring-2 transition`}>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wide font-semibold">{a.severity}</span>
              <p className="text-sm">{a.message}</p>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="text-sm text-gray-500">No alerts.</div>
        )}
      </div>
    </div>
  );
}



