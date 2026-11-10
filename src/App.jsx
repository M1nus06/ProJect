import React, { useEffect, useState } from "react";
import useDutyStore from "./store/useDutyStore.js";
import Navbar from "./components/Navbar";
import LamduanForm from "./components/LamduanForm";
import HospitalDashboard from "./components/HospitalDashboard";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [tab, setTab] = useState("lamduan");
  const { users, cases, fetchAll, submitCase, updateStatus, toggleUser } =
    useDutyStore();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <Navbar tab={tab} setTab={setTab} cases={cases} />

      <main className="max-w-6xl mx-auto p-4 sm:p-6">
        {tab === "lamduan" && <LamduanForm onSubmitCase={submitCase} />}
        {tab === "hospital" && (
          <HospitalDashboard cases={cases} handleUpdateStatus={updateStatus} />
        )}
        {tab === "admin" && (
          <AdminPanel
            cases={cases}
            users={users}
            handleToggleUser={toggleUser}
          />
        )}
      </main>
    </div>
  );
}
