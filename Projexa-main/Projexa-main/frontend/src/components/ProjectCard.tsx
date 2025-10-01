import React from "react";

export type Milestone = {
  id: string;
  title: string;
  dueDate: string;
  progressPercent: number;
};

export type Project = {
  id: string;
  name: string;
  manager: string;
  budgetUsd: number;
  spentUsd: number;
  milestones: Milestone[];
  engineersAssigned: string[];
};

type ProjectCardProps = {
  project: Project;
  onAssignEngineer?: (projectId: string) => void;
};

export default function ProjectCard({ project, onAssignEngineer }: ProjectCardProps) {
  const budgetUsed = project.spentUsd / project.budgetUsd;
  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#035096]/10 p-4 md:p-6 flex flex-col gap-4 hover:shadow-lg transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[#035096]">{project.name}</h3>
          <p className="text-sm text-gray-500">Manager: {project.manager}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Budget</p>
          <p className="text-base font-medium text-gray-900">
            ${project.spentUsd.toLocaleString()} / ${project.budgetUsd.toLocaleString()}
          </p>
        </div>
      </div>

      <div>
        <div className="h-2 w-full bg-[#035096]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#035096]"
            style={{ width: `${Math.min(100, Math.round(budgetUsed * 100))}%` }}
          />
        </div>
        <div className="mt-1 text-xs text-gray-500">{Math.round(budgetUsed * 100)}% budget used</div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-500">Engineers:</span>
        {project.engineersAssigned.length === 0 ? (
          <span className="text-xs text-gray-400">None</span>
        ) : (
          project.engineersAssigned.map((e) => (
            <span key={e} className="text-xs bg-[#035096]/10 text-[#035096] px-2 py-1 rounded">
              {e}
            </span>
          ))
        )}
        {onAssignEngineer && (
          <button
            className="ml-auto text-xs px-2 py-1 rounded bg-[#035096]/10 text-[#035096] hover:bg-[#035096]/20 transition"
            onClick={() => onAssignEngineer(project.id)}
          >
            Assign
          </button>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Milestones</p>
        <div className="grid md:grid-cols-2 gap-3">
          {project.milestones.map((m) => (
            <div key={m.id} className="border border-[#035096]/10 rounded-lg p-3 hover:shadow-sm transition">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[#035096]">{m.title}</p>
                <span className="text-xs text-gray-500">Due {m.dueDate}</span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-[#035096]/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#035096]" style={{ width: `${m.progressPercent}%` }} />
              </div>
              <div className="mt-1 text-xs text-gray-500">{m.progressPercent}% complete</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



