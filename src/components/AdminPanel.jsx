import React from "react";
import useDutyStore from "/src/store/useDutyStore.js";

export default function AdminPanel({ cases, users, handleToggleUser }) {
  const toggleUser = useDutyStore((s) => s.toggleUser);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">
            เคสแจ้งทั้งหมดวันนี้
          </div>
          <div className="text-2xl font-black text-slate-800 mt-1">
            {cases.length} เคส
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">
            เคสวิกฤต (Red Zone)
          </div>
          <div className="text-2xl font-black text-red-600 mt-1">
            {cases.filter((c) => c.triage === "red").length} เคส
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">
            เจ้าหน้าที่ปฏิบัติงาน
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {users.filter((u) => u.active).length} คน
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">
            จัดการสิทธิ์เจ้าหน้าที่
          </h3>
          <span className="text-xs text-slate-400">Admin Control</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b">
                <th className="p-3">ชื่อ-นามสกุล</th>
                <th className="p-3">ตำแหน่ง / บทบาท</th>
                <th className="p-3">สังกัด</th>
                <th className="p-3">สถานะ</th>
                <th className="p-3 text-right">สวิตช์เปิด/ปิด</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{u.name}</td>
                  <td className="p-3 text-slate-600">{u.role}</td>
                  <td className="p-3 text-slate-500">{u.dept}</td>
                  <td className="p-3">
                    {u.active ? (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold rounded text-[10px]">
                        เปิดใช้งาน
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 font-bold rounded text-[10px]">
                        ปิดการใช้งาน
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleToggleUser(u.id)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] rounded transition-all"
                    >
                      สลับสถานะ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
