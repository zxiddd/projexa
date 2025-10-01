import React from "react";

type MilestoneCardProps = {
  title: string;
  owner: string;
  dueDate: string;
  progressPercent: number;
};

export default function MilestoneCard({ title, owner, dueDate, progressPercent }: MilestoneCardProps) {
  return (
    <div className="border border-[#035096]/10 rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-semibold text-[#035096]">{title}</h4>
          <p className="text-xs text-gray-500">Owner: {owner}</p>
        </div>
        <span className="text-xs text-gray-500">Due {dueDate}</span>
      </div>
      <div className="mt-3 h-1.5 w-full bg-[#035096]/10 rounded-full overflow-hidden">
        <div className="h-full bg-[#035096]" style={{ width: `${progressPercent}%` }} />
      </div>
      <div className="mt-1 text-xs text-gray-500">{progressPercent}% complete</div>
    </div>
  );
}



