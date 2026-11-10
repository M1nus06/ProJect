import { create } from "zustand";
import { api } from "/src/lib/api";
import { supabase } from "../lib/supabase";

const dutyStore = (set, get) => ({
  users: [],
  cases: [],

  // ดึงข้อมูลทั้งหมดจาก db.json
  fetchAll: async () => {
    try {
      //json backend
      // const casesRes = await api.get("/cases");
      // const usersRes = await api.get("/users");

      //supabase backend
      const { data: casesData, error: casesError } = await supabase
        .from("cases")
        .select("*");
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("*");

      if (casesError) throw casesError;
      if (usersError) throw usersError;

      set({
        cases: Array.isArray(casesData) ? casesData : [],
        users: Array.isArray(usersData) ? usersData : [],
      });
    } catch (error) {
      console.log("fetch error", error.message);
    }
  },

  // !!!supabase backend!!!
  addCase: async (newCase) => {
    try {
      // บันทึกลง Supabase (แนะนำให้ใช้ UUID หรือปล่อยให้ Database เจน ID อัตโนมัติ หรือส่ง id ไปด้วยก็ได้)
      const { data, error } = await supabase
        .from("cases")
        .insert([newCase])
        .select();

      if (error) throw error;

      const currentCases = Array.isArray(get().cases) ? get().cases : [];
      set({
        cases: [data[0], ...currentCases],
      });
      return true;
    } catch (error) {
      console.log("Addcase error detail: ", error.message);
      return false;
    }
  },

  updateCaseStatus: async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from("cases")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      set({
        cases: get().cases.map((c) =>
          c.id === id ? { ...c, status: newStatus } : c,
        ),
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  toggleUser: async (id) => {
    try {
      const targetUser = get().users.find((u) => u.id === id);
      if (!targetUser) return;

      const newActiveState = !targetUser.active;
      const { error } = await supabase
        .from("users")
        .update({ active: newActiveState })
        .eq("id", id);
      if (error) throw error;

      set({
        users: get().users.map((u) =>
          u.id === id ? { ...u, active: newActiveState } : u,
        ),
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  // !!!json backend !!!
  // สร้างเคสใหม่
  // submitCase: async (formData) => {
  //   try {
  //     const newCase = {
  //       ...formData,
  //       id: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
  //       status: "pending",
  //       timestamp: new Date().toLocaleTimeString("th-TH", {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       }),
  //     };

  //     await api.post("/cases", newCase);
  //     // โหลดข้อมูลเคสใหม่ทันทีหลังบันทึก
  //     const res = await api.get("/cases");
  //     set({ cases: Array.isArray(res.data) ? res.data : [] });
  //     return true;
  //   } catch (error) {
  //     console.log("submit case error", error.message);
  //     return false;
  //   }
  // },

  // // อัปเดตสถานะเคส (pending -> accepted -> treating -> completed)
  // updateStatus: async (id, newStatus) => {
  //   try {
  //     // ดึงข้อมูลเคสเดิมมาก่อนเพื่อ patch ข้อมูล
  //     const currentCases = get().cases;
  //     const targetCase = currentCases.find((c) => c.id === id);
  //     if (!targetCase) return;

  //     await api.patch(`/cases/${id}`, { status: newStatus });

  //     set({
  //       cases: currentCases.map((c) =>
  //         c.id === id ? { ...c, status: newStatus } : c,
  //       ),
  //     });
  //   } catch (error) {
  //     console.log("update status error", error.message);
  //   }
  // },

  // // สลับสถานะเปิด/ปิดการใช้งานของ User
  // toggleUser: async (id) => {
  //   try {
  //     const currentUsers = get().users;
  //     const targetUser = currentUsers.find((u) => u.id === id);
  //     if (!targetUser) return;

  //     const updatedActive = !targetUser.active;
  //     await api.patch(`/users/${id}`, { active: updatedActive });

  //     set({
  //       users: currentUsers.map((u) =>
  //         u.id === id ? { ...u, active: updatedActive } : u,
  //       ),
  //     });
  //   } catch (error) {
  //     console.log("toggle user error", error.message);
  //   }
  // },
});

const useDutyStore = create(dutyStore);
export default useDutyStore;
