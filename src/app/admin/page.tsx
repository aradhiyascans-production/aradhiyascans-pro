'use client';

import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { isFirebaseConfigured } from "@/lib/firebase";
import { fetchTests, addTest, updateTest, deleteTest, fetchTestProfiles, addTestProfile, updateTestProfile, deleteTestProfile } from "@/lib/tests-service";
import { type MedicalTest, type TestProfile, type Availability, type PackageCategory } from "@/lib/types";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FileSpreadsheet,
  Layers,
  LogOut,
  FolderLock,
  Menu,
  X,
  Loader2,
  Lock,
  Mail,
  Search,
  Plus,
  Trash2,
  Edit,
  Activity,
  ArrowRight,
  AlertCircle,
  Star
} from "lucide-react";

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminDashboard />
    </AuthProvider>
  );
}

function AdminDashboard() {
  const { user, loading, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "tests" | "packages">("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      try {
        await logout();
      } catch (err) {
        toast.error("Logout failed");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-cream text-brand-charcoal px-6">
        <Loader2 className="h-10 w-10 animate-spin text-brand-emerald" />
        <p className="mt-4 text-sm font-medium text-brand-charcoal/60 font-sans">Loading Admin Portal...</p>
      </div>
    );
  }

  if (!user) {
    return <AdminLoginForm login={login} />;
  }

  const navLinks = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "tests", label: "Manage Tests", icon: FileSpreadsheet },
    { id: "packages", label: "Manage Packages", icon: Layers },
  ] as const;

  return (
    <div className="bg-brand-cream min-h-screen py-8 sm:py-12 lg:py-16 font-sans text-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Admin Header Banner */}
        <div className="mb-8 flex flex-col gap-4 border-b border-brand-charcoal/5 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4 text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-white border border-brand-charcoal/5 text-brand-emerald mt-1">
              <FolderLock className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-brand-charcoal leading-none">
                Administrative Control Panel
              </h1>
              <p className="text-xs text-brand-charcoal/60 leading-relaxed mt-1 max-w-xl">
                Securely manage diagnostic test catalogs and health packages in the database.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex gap-2 items-center px-4 py-2.5 rounded-full border border-brand-charcoal/10 bg-brand-white text-xs font-semibold uppercase tracking-wider text-brand-charcoal transition hover:bg-brand-cream cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              Menu
            </button>

            {/* Sign out */}
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-charcoal border border-brand-charcoal/10 hover:bg-brand-white transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mb-6 rounded-3xl border border-brand-charcoal/5 bg-brand-white p-4 space-y-1.5 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-xs font-semibold uppercase tracking-wider transition text-left cursor-pointer ${
                    isActive ? "bg-brand-emerald text-brand-cream" : "text-brand-charcoal/60 hover:bg-brand-cream hover:text-brand-charcoal"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Grid Layout: Sidebar + Main content */}
        <div className="grid gap-8 md:grid-cols-12 items-start">
          
          {/* Desktop Navigation Sidebar */}
          <aside className="hidden md:block md:col-span-3 space-y-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full flex items-center gap-3 rounded-full px-5 py-3.5 text-xs font-semibold uppercase tracking-wider transition text-left cursor-pointer border ${
                    isActive
                      ? "bg-brand-emerald text-brand-cream border-transparent shadow-xs"
                      : "bg-brand-white text-brand-charcoal/70 border-brand-charcoal/5 hover:border-brand-emerald/20 hover:text-brand-charcoal"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {link.label}
                </button>
              );
            })}
          </aside>

          {/* Tab Content Panel */}
          <main className="md:col-span-9 w-full">
            {activeTab === "overview" && <TabOverview activeTabTo={setActiveTab} />}
            {activeTab === "tests" && <TabTests />}
            {activeTab === "packages" && <TabPackages />}
          </main>

        </div>

      </div>
    </div>
  );
}

/* ==========================================================================
   Tab 1: Overview Dashboard
   ========================================================================== */
function TabOverview({ activeTabTo }: { activeTabTo: (tab: any) => void }) {
  const [stats, setStats] = useState({ tests: 0, packages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const testsList = await fetchTests();
        const profilesList = await fetchTestProfiles();

        setStats({
          tests: testsList.length,
          packages: profilesList.length
        });
      } catch (err) {
        console.error("Failed to load overview stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statCards = [
    { title: "Medical Tests", value: stats.tests, label: "Individual tests in database", tab: "tests", icon: FileSpreadsheet },
    { title: "Health Packages", value: stats.packages, label: "Screening packages database", tab: "packages", icon: Layers },
  ] as const;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-brand-emerald text-brand-cream p-5 sm:p-8 shadow-xs text-left relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-brand-white/5 rounded-full blur-3xl" />
        <h2 className="font-serif text-2xl sm:text-3xl font-medium">Hello, Administrator</h2>
        <p className="mt-2 text-xs sm:text-sm text-brand-cream/80 max-w-xl font-medium">
          Welcome to the Aradhiya Scans & Lab database manager. Update standard pricing scales and add or remove package configurations live.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {statCards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div key={idx} className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-6 shadow-xs flex flex-col justify-between text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal/50">{c.title}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-cream border border-brand-charcoal/5 text-brand-emerald">
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-6">
                <span className="text-3xl font-serif font-light text-brand-charcoal">{loading ? "..." : c.value}</span>
                <p className="mt-1 text-[10px] text-brand-charcoal/60 leading-normal font-medium">{c.label}</p>
              </div>
              <button
                onClick={() => activeTabTo(c.tab)}
                className="mt-4 text-[10px] font-bold uppercase tracking-wider text-brand-emerald hover:text-brand-emerald-dark transition flex items-center gap-1 cursor-pointer"
              >
                Manage <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Operational Summary */}
      <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-5 sm:p-8 shadow-xs text-left relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-brand-emerald">
            <Activity className="h-5 w-5 animate-pulse" />
            <h3 className="font-serif text-lg font-medium">Catalog Integrity & Sync</h3>
          </div>
          <p className="text-xs text-brand-charcoal/60 leading-relaxed font-medium">
            Updates to standard prices, availability scopes, and prep instructions in the catalog are immediately synchronized with the database catalog records.
          </p>
        </div>
      </div>

    </div>
  );
}

/* ==========================================================================
   Tab 2: Manage tests
   ========================================================================== */
function TabTests() {
  const [tests, setTests] = useState<MedicalTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<MedicalTest | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState<Availability>("Both");
  const [duration, setDuration] = useState("Same Day");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [requirements, setRequirements] = useState("No special preparation required");
  const [biomarkers, setBiomarkers] = useState<string[]>([]);
  const [biomarkerInput, setBiomarkerInput] = useState("");

  const addBiomarker = () => {
    const trimmed = biomarkerInput.trim();
    if (trimmed && !biomarkers.includes(trimmed)) {
      setBiomarkers([...biomarkers, trimmed]);
    }
    setBiomarkerInput("");
  };

  const removeBiomarker = (indexToRemove: number) => {
    setBiomarkers(biomarkers.filter((_, idx) => idx !== indexToRemove));
  };

  const handleBiomarkerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addBiomarker();
    }
  };

  const loadTests = async () => {
    setLoading(true);
    try {
      const list = await fetchTests();
      setTests(list.filter(t => t.category !== "Test Profiles"));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTests(); }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setAvailability("Both");
    setDuration("Same Day");
    setPrice("");
    setDiscountPrice("");
    setRequirements("No special preparation required");
    setBiomarkers([]);
    setBiomarkerInput("");
    setShowForm(false);
    setEditing(null);
  };

  const handleEdit = (test: MedicalTest) => {
    setEditing(test);
    setName(test.name);
    setDescription(test.description);
    setAvailability(test.availability);
    setDuration(test.duration);
    setPrice(test.price ? String(test.price) : "");
    setDiscountPrice(test.discountPrice ? String(test.discountPrice) : "");
    setRequirements(test.requirements ? test.requirements.join(", ") : "");
    setBiomarkers(test.biomarkers || []);
    setBiomarkerInput("");
    setShowForm(true);
  };

  const handleDeleteClick = async (id: string, testName: string) => {
    if (confirm(`Are you sure you want to delete the test "${testName}"?`)) {
      try {
        await deleteTest(id);
        toast.success("Test deleted successfully");
        loadTests();
      } catch (err: any) {
        toast.error("Failed to delete test: " + err.message);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      toast.error("Name and description are required");
      return;
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const payload: Omit<MedicalTest, "id"> = {
      name,
      description,
      availability,
      duration,
      category: "Tests",
      slug,
      price: price ? Number(price) : null,
      discountPrice: discountPrice ? Number(discountPrice) : null,
      biomarkers: biomarkers,
      requirements: requirements.split(",").map(r => r.trim()).filter(Boolean),
    };

    try {
      if (editing) {
        await updateTest(editing.id, payload);
        toast.success("Test updated successfully");
      } else {
        await addTest(payload);
        toast.success("Test added successfully");
      }
      resetForm();
      loadTests();
    } catch (err: any) {
      toast.error("Failed to save test: " + err.message);
    }
  };

  const filtered = tests.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div>
          <h3 className="font-serif text-lg font-semibold">Manage Diagnostic Tests</h3>
          <p className="text-xs text-brand-charcoal/60 leading-relaxed font-medium">Create or update listings for individual diagnostic tests.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="self-start sm:self-auto px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-cream bg-brand-emerald hover:bg-brand-emerald-dark transition flex items-center gap-1.5 cursor-pointer shadow-xs border-none"
          >
            <Plus className="h-4 w-4" /> Add Test
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-5 sm:p-8 shadow-xs text-left space-y-6">
          <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-3">
            <h4 className="font-serif text-lg font-medium">
              {editing ? `Edit Medical Test: ${editing.name}` : "Create Medical Test"}
            </h4>
            <button onClick={resetForm} className="text-brand-charcoal/50 hover:text-brand-charcoal transition border-none bg-transparent cursor-pointer">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">Test Name</label>
              <input
                type="text"
                placeholder="e.g. Complete Blood Count (CBC)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
                required
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">Description</label>
              <textarea
                placeholder="Brief clinical description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition min-h-[80px]"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">Availability</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as Availability)}
                className="w-full px-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-semibold uppercase tracking-wider text-brand-charcoal/80 cursor-pointer"
              >
                <option value="Both">Both Lab & Home</option>
                <option value="Lab">Lab Only</option>
                <option value="Home">Home Only</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">Turnaround Time</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">Standard Price (₹)</label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">Discount Price (₹)</label>
              <input
                type="number"
                placeholder="e.g. 399"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">Patient Preparation Guidelines (Comma Separated)</label>
              <input
                type="text"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">
                Parameters/Biomarkers Tested
              </label>
              <div className="flex flex-col gap-2.5">
                {biomarkers.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-brand-cream/40 rounded-2xl border border-brand-charcoal/5 min-h-[46px] items-center">
                    {biomarkers.map((tag, idx) => (
                      <div
                        key={idx}
                        className="bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/10 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeBiomarker(idx)}
                          className="hover:text-red-500 hover:bg-brand-emerald/20 transition rounded-full p-0.5 w-4.5 h-4.5 flex items-center justify-center text-[10px] font-bold bg-transparent border-none cursor-pointer"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type biomarker/parameter (e.g. Hemoglobin) and press Enter or click Add"
                    value={biomarkerInput}
                    onChange={(e) => setBiomarkerInput(e.target.value)}
                    onKeyDown={handleBiomarkerKeyDown}
                    className="flex-1 px-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
                  />
                  <button
                    type="button"
                    onClick={addBiomarker}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-charcoal border border-brand-charcoal/10 hover:bg-brand-white bg-brand-white transition cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:col-span-2 flex flex-col sm:flex-row justify-end gap-2.5 sm:gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-brand-charcoal/10 hover:bg-brand-cream transition text-xs font-semibold uppercase tracking-wider text-brand-charcoal cursor-pointer bg-transparent"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-cream bg-brand-emerald hover:bg-brand-emerald-dark cursor-pointer shadow-xs border-none"
              >
                Save Test
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tests Catalog Panel */}
      <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-5 sm:p-8 shadow-xs text-left space-y-6">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-brand-charcoal/40" />
          <input
            type="text"
            placeholder="Search by test name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-brand-emerald" />
            <p className="mt-3 text-xs text-brand-charcoal/50 font-medium">Loading test catalog...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto w-full rounded-2xl border border-brand-charcoal/5">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="bg-brand-cream/80 border-b border-brand-charcoal/5">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-charcoal/60">Test Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-charcoal/60">Availability</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-charcoal/60">Turnaround</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-charcoal/60">Price</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-charcoal/60 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-charcoal/5">
                {filtered.map((test) => (
                  <tr key={test.id} className="hover:bg-brand-cream/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-brand-charcoal">{test.name}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-brand-charcoal/60">{test.availability}</td>
                    <td className="px-6 py-4 text-xs text-brand-charcoal/60 font-medium">{test.duration}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-brand-charcoal">
                      {test.discountPrice ? (
                        <div className="flex items-center gap-1.5">
                          <span>₹{test.discountPrice}</span>
                          <span className="text-xs text-brand-charcoal/40 line-through">₹{test.price}</span>
                        </div>
                      ) : test.price ? (
                        `₹${test.price}`
                      ) : (
                        <span className="italic text-brand-charcoal/40 text-xs">Quote</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleEdit(test)}
                          className="p-2 text-brand-emerald hover:bg-brand-cream rounded-xl transition cursor-pointer border-none"
                          title="Edit test"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(test.id, test.name)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition cursor-pointer border-none"
                          title="Delete test listing"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-xs text-brand-charcoal/50 font-medium border border-dashed border-brand-charcoal/10 rounded-2xl">
            No tests found.
          </div>
        )}
      </div>

    </div>
  );
}

/* ==========================================================================
   Tab 3: Manage Packages (Profiles)
   ========================================================================== */
function TabPackages() {
  const [packages, setPackages] = useState<TestProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TestProfile | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState<Availability>("Both");
  const [duration, setDuration] = useState("Same Day");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [requirements, setRequirements] = useState("No special preparation required");
  const [includedTests, setIncludedTests] = useState<string[]>([]);
  const [includedTestInput, setIncludedTestInput] = useState("");
  const [showOnHome, setShowOnHome] = useState(false);

  const addIncludedTest = () => {
    const trimmed = includedTestInput.trim();
    if (trimmed && !includedTests.includes(trimmed)) {
      setIncludedTests([...includedTests, trimmed]);
    }
    setIncludedTestInput("");
  };

  const removeIncludedTest = (indexToRemove: number) => {
    setIncludedTests(includedTests.filter((_, idx) => idx !== indexToRemove));
  };

  const handleIncludedTestKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIncludedTest();
    }
  };

  const [includedCategories, setIncludedCategories] = useState<PackageCategory[]>([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryTestInputs, setCategoryTestInputs] = useState<Record<string, string>>({});

  const addCategory = () => {
    const trimmed = categoryInput.trim();
    if (trimmed && !includedCategories.some(c => c.categoryName.toLowerCase() === trimmed.toLowerCase())) {
      setIncludedCategories([...includedCategories, { categoryName: trimmed, tests: [] }]);
    }
    setCategoryInput("");
  };

  const removeCategory = (index: number) => {
    setIncludedCategories(includedCategories.filter((_, idx) => idx !== index));
  };

  const handleCategoryKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCategory();
    }
  };

  const addTestToCategory = (categoryName: string) => {
    const testVal = (categoryTestInputs[categoryName] || "").trim();
    if (!testVal) return;

    setIncludedCategories(prev =>
      prev.map(cat => {
        if (cat.categoryName === categoryName) {
          if (!cat.tests.includes(testVal)) {
            return { ...cat, tests: [...cat.tests, testVal] };
          }
        }
        return cat;
      })
    );

    setCategoryTestInputs(prev => ({
      ...prev,
      [categoryName]: ""
    }));
  };

  const removeTestFromCategory = (categoryName: string, testIndex: number) => {
    setIncludedCategories(prev =>
      prev.map(cat => {
        if (cat.categoryName === categoryName) {
          return {
            ...cat,
            tests: cat.tests.filter((_, idx) => idx !== testIndex)
          };
        }
        return cat;
      })
    );
  };

  const handleCategoryTestKeyDown = (e: React.KeyboardEvent, categoryName: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTestToCategory(categoryName);
    }
  };

  const loadPackages = async () => {
    setLoading(true);
    try {
      const list = await fetchTestProfiles();
      setPackages(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPackages(); }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setAvailability("Both");
    setDuration("Same Day");
    setPrice("");
    setDiscountPrice("");
    setRequirements("No special preparation required");
    setIncludedTests([]);
    setIncludedTestInput("");
    setIncludedCategories([]);
    setCategoryInput("");
    setCategoryTestInputs({});
    setShowOnHome(false);
    setShowForm(false);
    setEditing(null);
  };

  const handleEdit = (pkg: TestProfile) => {
    setEditing(pkg);
    setName(pkg.name);
    setDescription(pkg.description);
    setAvailability(pkg.availability);
    setDuration(pkg.duration);
    setPrice(pkg.price ? String(pkg.price) : "");
    setDiscountPrice(pkg.discountPrice ? String(pkg.discountPrice) : "");
    setRequirements(pkg.requirements ? pkg.requirements.join(", ") : "");
    setIncludedTests(pkg.includedTests || []);
    setIncludedTestInput("");
    setIncludedCategories(pkg.includedCategories || []);
    setCategoryInput("");
    setCategoryTestInputs({});
    setShowOnHome(pkg.showOnHome || false);
    setShowForm(true);
  };

  const handleDeleteClick = async (id: string, pkgName: string) => {
    if (confirm(`Are you sure you want to delete the package "${pkgName}"?`)) {
      try {
        await deleteTestProfile(id);
        toast.success("Package deleted successfully");
        loadPackages();
      } catch (err: any) {
        toast.error("Failed to delete package: " + err.message);
      }
    }
  };

  const handleToggleShowOnHome = async (pkg: TestProfile) => {
    try {
      const updatedStatus = !pkg.showOnHome;
      if (updatedStatus) {
        const featuredCount = packages.filter(p => p.showOnHome && p.id !== pkg.id).length;
        if (featuredCount >= 6) {
          toast.error("Maximum of 6 packages can be featured on the homepage. Please unfeature another package first.");
          return;
        }
      }
      await updateTestProfile(pkg.id, { showOnHome: updatedStatus });
      toast.success(`Package "${pkg.name}" ${updatedStatus ? "featured on homepage" : "removed from homepage"}`);
      loadPackages();
    } catch (err: any) {
      toast.error("Failed to toggle homepage status: " + err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      toast.error("Name and description are required");
      return;
    }
    if (showOnHome) {
      const featuredCount = packages.filter(p => p.showOnHome && p.id !== editing?.id).length;
      if (featuredCount >= 6) {
        toast.error("Maximum of 6 packages can be featured on the homepage. Please unfeature another package first.");
        return;
      }
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const payload: Omit<TestProfile, "id"> = {
      name,
      description,
      availability,
      duration,
      category: "Test Profiles",
      slug,
      price: price ? Number(price) : null,
      discountPrice: discountPrice ? Number(discountPrice) : null,
      requirements: requirements.split(",").map(r => r.trim()).filter(Boolean),
      includedTests: includedTests,
      includedCategories: includedCategories,
      showOnHome
    };

    try {
      if (editing) {
        await updateTestProfile(editing.id, payload);
        toast.success("Package updated successfully");
      } else {
        await addTestProfile(payload);
        toast.success("Package added successfully");
      }
      resetForm();
      loadPackages();
    } catch (err: any) {
      toast.error("Failed to save package: " + err.message);
    }
  };

  const filtered = packages.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div>
          <h3 className="font-serif text-lg font-semibold">Manage Health Packages</h3>
          <p className="text-xs text-brand-charcoal/60 leading-relaxed font-medium">Create or edit wellness packages and combined diagnostic screening panels.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="self-start sm:self-auto px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-cream bg-brand-emerald hover:bg-brand-emerald-dark transition flex items-center gap-1.5 cursor-pointer shadow-xs border-none"
          >
            <Plus className="h-4 w-4" /> Add Package
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-5 sm:p-8 shadow-xs text-left space-y-6">
          <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-3">
            <h4 className="font-serif text-lg font-medium">
              {editing ? `Edit Health Package: ${editing.name}` : "Create Health Package"}
            </h4>
            <button onClick={resetForm} className="text-brand-charcoal/50 hover:text-brand-charcoal transition border-none bg-transparent cursor-pointer">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">Package Name</label>
              <input
                type="text"
                placeholder="e.g. Master Wellness Package"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
                required
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">Description</label>
              <textarea
                placeholder="Summary of what organs or wellness functions this panel screens..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition min-h-[80px]"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">Availability</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as Availability)}
                className="w-full px-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-semibold uppercase tracking-wider text-brand-charcoal/80 cursor-pointer"
              >
                <option value="Both">Both Lab & Home</option>
                <option value="Lab">Lab Only</option>
                <option value="Home">Home Only</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">Turnaround Time</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">Standard Price (₹)</label>
              <input
                type="number"
                placeholder="e.g. 2500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">Discount Price (₹)</label>
              <input
                type="number"
                placeholder="e.g. 1999"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">
                Included Tests
              </label>
              <div className="flex flex-col gap-2.5">
                {includedTests.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-brand-cream/40 rounded-2xl border border-brand-charcoal/5 min-h-[46px] items-center">
                    {includedTests.map((tag, idx) => (
                      <div
                        key={idx}
                        className="bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/10 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeIncludedTest(idx)}
                          className="hover:text-red-500 hover:bg-brand-emerald/20 transition rounded-full p-0.5 w-4.5 h-4.5 flex items-center justify-center text-[10px] font-bold bg-transparent border-none cursor-pointer"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a test (e.g. Hemoglobin) and press Enter or click Add"
                    value={includedTestInput}
                    onChange={(e) => setIncludedTestInput(e.target.value)}
                    onKeyDown={handleIncludedTestKeyDown}
                    className="flex-1 px-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
                  />
                  <button
                    type="button"
                    onClick={addIncludedTest}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-charcoal border border-brand-charcoal/10 hover:bg-brand-white bg-brand-white transition cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-3 sm:col-span-2 border-t border-brand-charcoal/5 pt-4">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">
                Categorized Test Groups (Optional - e.g. Lipid Profile, Liver Function)
              </label>

              {/* Add Category Section */}
              <div className="flex flex-col sm:flex-row gap-2.5 p-4 bg-brand-cream/30 border border-brand-charcoal/5 rounded-3xl items-stretch sm:items-center">
                <input
                  type="text"
                  placeholder="e.g. Lipid Profile, Liver Function..."
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={handleCategoryKeyDown}
                  className="w-full sm:flex-1 px-4 py-2.5 rounded-full bg-brand-white border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-cream bg-brand-emerald hover:bg-brand-emerald-dark transition flex items-center justify-center gap-1 cursor-pointer border-none shadow-xs"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Category
                </button>
              </div>

              {/* Render Categories List */}
              {includedCategories.length > 0 && (
                <div className="space-y-4 mt-2">
                  {includedCategories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-brand-cream/20 border border-brand-charcoal/5 rounded-3xl space-y-3 relative transition-all"
                    >
                      {/* Category Header */}
                      <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald" />
                          <span className="font-serif text-sm font-semibold text-brand-charcoal leading-none">
                            {cat.categoryName}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCategory(idx)}
                          className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-xl transition cursor-pointer border-none bg-transparent"
                          title="Delete entire category"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Tests List inside Category */}
                      <div className="space-y-2">
                        <p className="text-[9px] font-bold text-brand-charcoal/40 uppercase tracking-widest leading-none">
                          Tests Included in {cat.categoryName}
                        </p>

                        {/* Test Tags */}
                        {cat.tests.length > 0 ? (
                          <div className="flex flex-wrap gap-2 py-1">
                            {cat.tests.map((testTag, testIdx) => (
                              <div
                                key={testIdx}
                                className="bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/10 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all"
                              >
                                <span>{testTag}</span>
                                <button
                                  type="button"
                                  onClick={() => removeTestFromCategory(cat.categoryName, testIdx)}
                                  className="hover:text-red-500 hover:bg-brand-emerald/20 transition rounded-full p-0.5 w-4 w-4 flex items-center justify-center text-[10px] font-bold bg-transparent border-none cursor-pointer"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[10px] text-brand-charcoal/40 italic py-0.5">No tests added yet.</p>
                        )}

                        {/* Add Test to Category Input */}
                        <div className="flex gap-2 pt-1.5">
                          <input
                            type="text"
                            placeholder={`Add test to ${cat.categoryName}...`}
                            value={categoryTestInputs[cat.categoryName] || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCategoryTestInputs(prev => ({
                                ...prev,
                                [cat.categoryName]: val
                              }));
                            }}
                            onKeyDown={(e) => handleCategoryTestKeyDown(e, cat.categoryName)}
                            className="flex-1 px-4 py-2 rounded-full bg-brand-white border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
                          />
                          <button
                            type="button"
                            onClick={() => addTestToCategory(cat.categoryName)}
                            className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-brand-charcoal border border-brand-charcoal/10 hover:bg-brand-white bg-brand-white transition cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60">Patient Preparation Guidelines (Comma Separated)</label>
              <input
                type="text"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
              />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="show-home"
                checked={showOnHome}
                onChange={(e) => setShowOnHome(e.target.checked)}
                className="h-4 w-4 rounded border-brand-charcoal/10 accent-brand-emerald cursor-pointer"
              />
              <label htmlFor="show-home" className="text-xs font-semibold text-brand-charcoal/80 cursor-pointer select-none">
                Show on Homepage (Highlight this wellness package on the landing page)
              </label>
            </div>

            <div className="mt-4 sm:col-span-2 flex flex-col sm:flex-row justify-end gap-2.5 sm:gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-brand-charcoal/10 hover:bg-brand-cream transition text-xs font-semibold uppercase tracking-wider text-brand-charcoal cursor-pointer bg-transparent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-cream bg-brand-emerald hover:bg-brand-emerald-dark cursor-pointer shadow-xs border-none"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Packages Listing Panel */}
        <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-5 sm:p-8 shadow-xs text-left space-y-6">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-brand-charcoal/40" />
          <input
            type="text"
            placeholder="Search by package name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-brand-emerald" />
            <p className="mt-3 text-xs text-brand-charcoal/50 font-medium">Loading health packages...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto w-full rounded-2xl border border-brand-charcoal/5">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr className="bg-brand-cream/80 border-b border-brand-charcoal/5">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-charcoal/60">Package Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-charcoal/60">Availability</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-charcoal/60">Tests Included</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-charcoal/60">Price</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-brand-charcoal/60 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-charcoal/5">
                {filtered.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-brand-cream/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-brand-charcoal">
                      <div className="flex items-center gap-1.5">
                        {pkg.name}
                        {pkg.showOnHome && (
                          <span className="bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/10 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                            Home Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-brand-charcoal/60">{pkg.availability}</td>
                    <td className="px-6 py-4 text-xs text-brand-charcoal/60 font-medium max-w-[200px] truncate">
                      {pkg.includedTests ? pkg.includedTests.join(", ") : "None"}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-brand-charcoal">
                      {pkg.discountPrice ? (
                        <div className="flex items-center gap-1.5">
                          <span>₹{pkg.discountPrice}</span>
                          <span className="text-xs text-brand-charcoal/40 line-through">₹{pkg.price}</span>
                        </div>
                      ) : pkg.price ? (
                        `₹${pkg.price}`
                      ) : (
                        <span className="italic text-brand-charcoal/40 text-xs">Quote</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleToggleShowOnHome(pkg)}
                          className={`p-2 rounded-xl transition cursor-pointer border-none ${
                            pkg.showOnHome 
                              ? 'text-brand-gold hover:bg-brand-gold/5' 
                              : 'text-brand-charcoal/40 hover:bg-brand-cream'
                          }`}
                          title={pkg.showOnHome ? "Remove from Homepage" : "Show on Homepage"}
                        >
                          <Star className="h-4 w-4" fill={pkg.showOnHome ? "currentColor" : "none"} />
                        </button>
                        <button
                          onClick={() => handleEdit(pkg)}
                          className="p-2 text-brand-emerald hover:bg-brand-cream rounded-xl transition cursor-pointer border-none"
                          title="Edit package details"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(pkg.id, pkg.name)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition cursor-pointer border-none"
                          title="Delete package listing"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-xs text-brand-charcoal/50 font-medium border border-dashed border-brand-charcoal/10 rounded-2xl">
            No packages found.
          </div>
        )}
      </div>

    </div>
  );
}

/* ==========================================================================
   Helper: Administrative Login Form
   ========================================================================== */
function AdminLoginForm({ login }: { login: (e: string, p: string) => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!email || !password) {
      setErrorMsg("Please enter email and password");
      return;
    }
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 bg-brand-cream font-sans text-brand-charcoal w-full text-left">
      <div className="w-full max-w-md rounded-3xl border border-brand-charcoal/5 bg-brand-white p-6 sm:p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cream border border-brand-charcoal/5 text-brand-emerald mx-auto mb-4">
            <Lock className="h-5 w-5" />
          </div>
          <h2 className="font-serif text-xl font-medium text-brand-charcoal">Admin Portal Login</h2>
          <p className="mt-1.5 text-xs text-brand-charcoal/60">
            Enter administrator credentials to access the scanner configuration hub.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl border border-red-500/10 bg-red-500/5 text-red-600 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60" htmlFor="admin-email">Email Address</label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-brand-charcoal/40" />
              <input
                id="admin-email"
                type="email"
                placeholder="admin@aradhiyascans.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60" htmlFor="admin-password">Password</label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-brand-charcoal/40" />
              <input
                id="admin-password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 py-3 mt-4 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-cream bg-brand-emerald hover:bg-brand-emerald-dark transition flex items-center justify-center gap-2 cursor-pointer shadow-xs border-none"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Access Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
