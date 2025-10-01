import React, { useMemo, useState } from "react";
import ProjectCard, { Project } from "./components/ProjectCard";
import MilestoneCard from "./components/MilestoneCard";
import AlertsPanel, { AlertItem } from "./components/AlertsPanel";

type UserRole = "manager" | "engineer" | "vendor" | "client" | "ai";

const dummyProjects: Project[] = [
  {
    id: "p1",
    name: "Corporate HQ Renovation",
    manager: "Alex Morgan",
    budgetUsd: 1800000,
    spentUsd: 640000,
    engineersAssigned: ["Taylor", "Jordan"],
    milestones: [
      { id: "m1", title: "Design Approval", dueDate: "2025-10-15", progressPercent: 100 },
      { id: "m2", title: "Structural Works", dueDate: "2025-12-10", progressPercent: 60 },
      { id: "m3", title: "MEP Installation", dueDate: "2026-01-20", progressPercent: 30 },
    ],
  },
  {
    id: "p2",
    name: "Solar Farm Expansion",
    manager: "Riley Chen",
    budgetUsd: 2600000,
    spentUsd: 1200000,
    engineersAssigned: ["Sam", "Priya", "Noah"],
    milestones: [
      { id: "m1", title: "Site Prep", dueDate: "2025-11-01", progressPercent: 90 },
      { id: "m2", title: "Panel Mounting", dueDate: "2025-12-25", progressPercent: 45 },
    ],
  },
];

const dummyAlerts: AlertItem[] = [
  { id: "a1", severity: "medium", message: "Possible delay: material lead time increased for steel." },
  { id: "a2", severity: "high", message: "P2 trending over budget by 8% for labor costs." },
];

export default function Dashboard() {
  const [role, setRole] = useState<UserRole>("manager");

  const roleOptions: { value: UserRole; label: string }[] = [
    { value: "manager", label: "Project Manager" },
    { value: "engineer", label: "Engineer / Field" },
    { value: "vendor", label: "Vendor / Subcontractor" },
    { value: "client", label: "Client / Stakeholder" },
    { value: "ai", label: "AI Engine" },
  ];

  const header = useMemo(() => {
    switch (role) {
      case "manager":
        return "Project Management Dashboard";
      case "engineer":
        return "Field Team Portal";
      case "vendor":
        return "Vendor & Subcontractor Portal";
      case "client":
        return "Client Overview";
      case "ai":
        return "AI Insights";
    }
  }, [role]);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#035096] text-white shadow">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-white/15 ring-1 ring-white/20 flex items-center justify-center">
              <span className="text-sm font-semibold">PM</span>
            </div>
            <p className="text-sm md:text-base opacity-90">{header}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs md:text-sm opacity-90">Role</label>
            <select
              className="text-xs md:text-sm rounded-lg bg-white text-gray-900 px-3 py-1.5 shadow-sm border border-white/0 focus:outline-none focus:ring-2 focus:ring-white/60"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              {roleOptions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
        {/* Gradient overview banner */}
        <div className="mb-6 rounded-2xl p-5 md:p-6 shadow-md border border-[#035096]/10 bg-gradient-to-r from-[#035096] to-[#035096]/80 text-white">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm md:text-base opacity-90 mt-1">Monitor projects, budgets, milestones and risks in one place.</p>
        </div>

        {role === "manager" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {dummyProjects.map((p) => (
                <ProjectCard key={p.id} project={p} onAssignEngineer={() => {}} />
              ))}
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 md:p-5">
                <h3 className="text-base font-semibold text-[#035096] mb-3">Upcoming Milestones</h3>
                <div className="space-y-3">
                  {dummyProjects.flatMap((p) => p.milestones.slice(0, 2)).map((m) => (
                    <MilestoneCard
                      key={`${m.id}-${m.title}`}
                      title={m.title}
                      owner={"TBD"}
                      dueDate={m.dueDate}
                      progressPercent={m.progressPercent}
                    />
                  ))}
                </div>
              </div>
              <AlertsPanel alerts={dummyAlerts} />
            </div>
          </div>
        )}

        {role === "engineer" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 md:p-5">
                <h3 className="text-base font-semibold text-[#035096] mb-3">Submit Progress</h3>
                <EngineerProgressForm />
              </div>
              <div className="space-y-4">
                {dummyProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <AlertsPanel alerts={dummyAlerts} />
            </div>
          </div>
        )}

        {role === "vendor" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 md:p-5">
                <h3 className="text-base font-semibold text-[#035096] mb-3">Submit Invoice</h3>
                <VendorInvoiceForm />
              </div>
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 md:p-5">
                <h3 className="text-base font-semibold text-[#035096] mb-3">Material Request</h3>
                <MaterialRequestForm />
              </div>
            </div>
            <div className="space-y-4">
              <AlertsPanel alerts={dummyAlerts} />
            </div>
          </div>
        )}

        {role === "client" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {dummyProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 md:p-5">
                <h3 className="text-base font-semibold text-[#035096] mb-3">Financial Summary</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {dummyProjects.map((p) => (
                    <li key={p.id} className="flex items-center justify-between">
                      <span>{p.name}</span>
                      <span>
                        ${p.spentUsd.toLocaleString()} / ${p.budgetUsd.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <AlertsPanel alerts={dummyAlerts} />
            </div>
          </div>
        )}

        {role === "ai" && (
          <div className="grid md:grid-cols-2 gap-6">
            <AlertsPanel alerts={dummyAlerts} />
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 md:p-5">
              <h3 className="text-base font-semibold text-[#035096] mb-2">AI Notes</h3>
              <p className="text-sm text-gray-600">
                The AI engine estimates a 20% likelihood of delay on structural works due to
                supply chain variance. Recommend buffer tasks and vendor alternatives.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EngineerProgressForm() {
  const [form, setForm] = useState({ projectId: "p1", progress: 50, notes: "" });
  return (
    <form className="flex flex-col gap-3">
      <div className="grid md:grid-cols-3 gap-3">
        <select
          className="rounded-lg border-gray-200 focus:ring-2 focus:ring-[#035096] focus:border-[#035096]"
          value={form.projectId}
          onChange={(e) => setForm({ ...form, projectId: e.target.value })}
        >
          {dummyProjects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          min={0}
          max={100}
          className="rounded-lg border-gray-200 focus:ring-2 focus:ring-[#035096] focus:border-[#035096]"
          value={form.progress}
          onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
        />
        <button type="button" className="rounded-lg bg-[#035096] text-white px-4 py-2 shadow hover:shadow-md hover:bg-[#02457f] transition">
          Upload Drawing
        </button>
      </div>
      <textarea
        className="rounded-lg border-gray-200 focus:ring-2 focus:ring-[#035096] focus:border-[#035096]"
        rows={3}
        placeholder="Progress notes..."
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />
      <div className="flex items-center justify-end">
        <button type="submit" className="rounded-lg bg-emerald-600 text-white px-4 py-2 shadow hover:shadow-md hover:bg-emerald-700">
          Submit
        </button>
      </div>
    </form>
  );
}

function VendorInvoiceForm() {
  const [form, setForm] = useState({ projectId: "p2", amount: 25000, invoiceNo: "INV-1023" });
  return (
    <form className="flex flex-col gap-3">
      <div className="grid md:grid-cols-3 gap-3">
        <select
          className="rounded-lg border-gray-200 focus:ring-2 focus:ring-[#035096] focus:border-[#035096]"
          value={form.projectId}
          onChange={(e) => setForm({ ...form, projectId: e.target.value })}
        >
          {dummyProjects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="rounded-lg border-gray-200 focus:ring-2 focus:ring-[#035096] focus:border-[#035096]"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
        />
        <input
          type="text"
          className="rounded-lg border-gray-200 focus:ring-2 focus:ring-[#035096] focus:border-[#035096]"
          value={form.invoiceNo}
          onChange={(e) => setForm({ ...form, invoiceNo: e.target.value })}
        />
      </div>
      <div className="flex items-center justify-end">
        <button type="submit" className="rounded-lg bg-[#035096] text-white px-4 py-2 shadow hover:shadow-md hover:bg-[#02457f] transition">
          Submit Invoice
        </button>
      </div>
    </form>
  );
}

function MaterialRequestForm() {
  const [form, setForm] = useState({ projectId: "p1", material: "Rebar", qty: 1000, notes: "" });
  return (
    <form className="flex flex-col gap-3">
      <div className="grid md:grid-cols-3 gap-3">
        <select
          className="rounded-lg border-gray-200 focus:ring-2 focus:ring-[#035096] focus:border-[#035096]"
          value={form.projectId}
          onChange={(e) => setForm({ ...form, projectId: e.target.value })}
        >
          {dummyProjects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="rounded-lg border-gray-200 focus:ring-2 focus:ring-[#035096] focus:border-[#035096]"
          value={form.material}
          onChange={(e) => setForm({ ...form, material: e.target.value })}
        />
        <input
          type="number"
          className="rounded-lg border-gray-200 focus:ring-2 focus:ring-[#035096] focus:border-[#035096]"
          value={form.qty}
          onChange={(e) => setForm({ ...form, qty: Number(e.target.value) })}
        />
      </div>
      <textarea
        className="rounded-lg border-gray-200 focus:ring-2 focus:ring-[#035096] focus:border-[#035096]"
        rows={3}
        placeholder="Notes..."
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />
      <div className="flex items-center justify-end">
        <button type="submit" className="rounded-lg bg-[#035096] text-white px-4 py-2 shadow hover:shadow-md hover:bg-[#02457f] transition">
          Request Material
        </button>
      </div>
    </form>
  );
}



