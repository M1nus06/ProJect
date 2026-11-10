import React, { useState } from "react";
import useDutyStore from "/src/store/useDutyStore.js";
import {
  Ambulance,
  AlertTriangle,
  Clock,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";

export default function LamduanForm() {
  const addCase = useDutyStore((s) => s.addCase);

  const [formData, setFormData] = useState({
    triage: "red",
    patientName: "",
    age: "",
    gender: "ชาย",
    location: "",
    symptoms: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCase = {
      ...formData,
      id: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
      age: formData.age ? Number(formData.age) : 0,
      status: "pending",
      timestamp: new Date().toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const success = await addCase(newCase);
    if (success) {
      alert("บันทึกข้อมูลและส่งแจ้งเตือนสำเร็จ!");
      setFormData({
        triage: "red",
        patientName: "",
        age: "",
        gender: "ชาย",
        location: "",
        symptoms: "",
      });
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const success = await addCase(formData);
  //   if (success) {
  //     alert("บันทึกข้อมูลและส่งแจ้งเตือนสำเร็จ!");
  //     setFormData({
  //       triage: "red",
  //       patientName: "",
  //       age: "",
  //       gender: "ชาย",
  //       location: "",
  //       symptoms: "",
  //     });
  //   }
  // };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Ambulance className="w-5 h-5 text-rose-600" />
          แบบฟอร์มบันทึกผู้ป่วยฉุกเฉิน (ศูนย์ลำดวน)
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          กรอกข้อมูลผู้ป่วยเพื่อส่งสัญญาณแจ้งเตือนไปยังโรงพยาบาลปลายทาง
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        {/* Triage Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            ระดับความฉุกเฉิน (Triage Level)
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, triage: "red" })}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-bold text-xs transition-all ${
                formData.triage === "red"
                  ? "bg-red-50 border-red-500 text-red-700 ring-2 ring-red-500/20"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              <AlertTriangle className="w-5 h-5 text-red-600" />
              วิกฤต (Red)
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, triage: "yellow" })}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-bold text-xs transition-all ${
                formData.triage === "yellow"
                  ? "bg-amber-50 border-amber-500 text-amber-700 ring-2 ring-amber-500/20"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              <Clock className="w-5 h-5 text-amber-500" />
              เร่งด่วน (Yellow)
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, triage: "green" })}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-bold text-xs transition-all ${
                formData.triage === "green"
                  ? "bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/20"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ทั่วไป (Green)
            </button>
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              ชื่อ-นามสกุล ผู้ป่วย
            </label>
            <input
              type="text"
              required
              placeholder="เช่น นาย สมชาย ใจดี"
              value={formData.patientName}
              onChange={(e) =>
                setFormData({ ...formData, patientName: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              อายุ (ปี)
            </label>
            <input
              type="number"
              placeholder="45"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              เพศ
            </label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            สถานที่เกิดเหตุ / จุดรับตัว
          </label>
          <input
            type="text"
            required
            placeholder="เช่น บ้านเลขที่, ถนน, หรือจุดสังเกต"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          />
        </div>

        {/* Symptoms */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            อาการสำคัญ / รายละเอียด
          </label>
          <textarea
            rows={3}
            required
            placeholder="ระบุอาการเบื้องต้น..."
            value={formData.symptoms}
            onChange={(e) =>
              setFormData({ ...formData, symptoms: e.target.value })
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow transition-all flex items-center justify-center gap-2"
        >
          <PhoneCall className="w-4 h-4" />
          ส่งข้อมูลแจ้งเหตุฉุกเฉิน (Submit Case)
        </button>
      </form>
    </div>
  );
}