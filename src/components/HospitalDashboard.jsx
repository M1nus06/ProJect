import React from "react";
import useDutyStore from "/src/store/useDutyStore.js";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";
import {
  Building2,
  Check,
  Stethoscope,
  CheckCircle2,
  MapPin,
} from "lucide-react";

export default function HospitalDashboard({ cases, handleUpdateStatus }) {
  useEffect(() => {
    // สมัครรับการเปลี่ยนแปลงจากตาราง cases
    const subscription = supabase
      .channel("public:cases")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "cases" },
        (payload) => {
          console.log("มีข้อมูลใหม่เข้ามา:", payload.new);

          // อัปเดต State ในหน้าจอทันที (เช่น นำข้อมูลใหม่ไปต่อท้าย State เดิม)
          setCases((prevCases) => [payload.new, ...prevCases]);
        },
      )
      .subscribe();

    // Cleanup เมื่อปิดหน้าเว็บ
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const { updateCaseStatus } = useDutyStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            รายการเคสฉุกเฉิน (ER Emergency Dashboard)
          </h2>
          <p className="text-xs text-slate-500">
            รับเคสและอัปเดตสถานะการรักษาแบบ Real-time
          </p>
        </div>
        <span className="text-xs bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full">
          รวม {cases.length} เคส
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {cases.map((c) => (
          <div
            key={c.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {c.id}
                </span>

                {c.triage === "red" && (
                  <span className="px-2.5 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                    วิกฤต (Red)
                  </span>
                )}
                {c.triage === "yellow" && (
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                    เร่งด่วน (Yellow)
                  </span>
                )}
                {c.triage === "green" && (
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                    ทั่วไป (Green)
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-400 font-mono">
                แจ้งเมื่อ: {c.timestamp}
              </div>
            </div>

            {/* Case Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400">ผู้ป่วย:</span>
                <div className="font-bold text-slate-800 text-sm">
                  {c.patientName} ({c.age || "-"} ปี, {c.gender || "ไม่ระบุ"})
                </div>
              </div>
              <div>
                <span className="text-slate-400">สถานที่:</span>
                <div className="font-medium text-slate-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />{" "}
                  {c.location || "ไม่ระบุสถานที่"}
                </div>
              </div>
              <div>
                <span className="text-slate-400">อาการสำคัญ:</span>
                <div className="font-medium text-slate-800">{c.symptoms}</div>
              </div>
            </div>

            {/* Status Buttons Action */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 flex-wrap gap-2">
              <div className="text-xs font-medium text-slate-500">
                สถานะ:{" "}
                <span className="font-bold text-slate-700">{c.status}</span>
              </div>

              <div className="flex items-center gap-2">
                {c.status === "pending" && (
                  <button
                    onClick={() => updateCaseStatus(c.id, "accepted")}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow transition-all flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    กดรับเคส (Accept)
                  </button>
                )}

                {c.status === "accepted" && (
                  <button
                    onClick={() => updateCaseStatus(c.id, "treating")}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow transition-all flex items-center gap-1"
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    กำลังรักษา (In Treatment)
                  </button>
                )}

                {c.status === "treating" && (
                  <button
                    onClick={() => updateCaseStatus(c.id, "completed")}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow transition-all flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    เสร็จสิ้น (Completed)
                  </button>
                )}

                {c.status === "completed" && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> ดำเนินการเรียบร้อย
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
