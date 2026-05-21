"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function DoctorUI() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="w-full h-full min-h-[400px] bg-[#f8fafb] text-[#1a2e44] font-['Inter',sans-serif] flex flex-col p-4">
      {/* Top Nav */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a2e44]">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span className="font-medium text-lg tracking-tight">MedFlow</span>
        </div>
        <div className="flex gap-6 text-sm text-[#1a2e44]/60">
          <span className="text-[#1a2e44] font-medium">Dashboard</span>
          <span>Appointments</span>
          <span>Patients</span>
          <span>Reports</span>
        </div>
      </div>

      <div className="flex gap-6 flex-1">
        {/* Left Sidebar */}
        <div className="w-48 flex flex-col gap-4">
          <div className="text-xs font-semibold text-[#1a2e44]/50 tracking-wider uppercase mb-2">Today's Patients</div>
          {[
            { name: "Eleanor Rigby", time: "09:00 AM" },
            { name: "John Smith", time: "10:30 AM" },
            { name: "Sarah Connor", time: "11:15 AM" }
          ].map((patient, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2d7dd2]/10 flex items-center justify-center text-xs font-medium text-[#2d7dd2]">
                {patient.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{patient.name}</span>
                <span className="text-xs text-[#1a2e44]/50">{patient.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <h1 className="text-2xl font-semibold tracking-tight">Weekly Schedule</h1>
            
            {/* Vitals Mini-Widget */}
            <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg border border-[#e2e8f0] shadow-sm">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#1a2e44]/40 tracking-wider">Avg Heart Rate</span>
                <span className="text-xl font-light text-[#3bb273]">98 bpm</span>
              </div>
              <svg width="40" height="20" viewBox="0 0 40 20" className="text-[#3bb273]">
                <motion.path
                  d="M0 10 L10 10 L15 2 L20 18 L25 10 L40 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={mounted ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
                />
              </svg>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 bg-white rounded-lg border border-[#e2e8f0] overflow-hidden flex shadow-sm relative">
            <div className="absolute inset-0 bg-[linear-gradient(#f1f5f9_1px,transparent_1px)] bg-[size:100%_40px] opacity-50 pointer-events-none"></div>
            <div className="absolute inset-0 flex">
               {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                 <div key={day} className="flex-1 border-r border-[#e2e8f0] last:border-r-0 relative">
                   <div className="h-10 border-b border-[#e2e8f0] flex items-center justify-center text-xs font-medium text-[#1a2e44]/60">
                     {day}
                   </div>
                 </div>
               ))}
            </div>
            
            {/* Appointments */}
            {mounted && (
              <>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="absolute top-[60px] left-[0%] w-[20%] p-1"
                >
                  <div className="bg-[#2d7dd2] text-white text-xs p-2 rounded flex flex-col shadow-sm cursor-default hover:bg-[#2366ae] transition-colors">
                    <span className="font-semibold">Consultation</span>
                    <span className="text-white/80">09:00 - 10:00</span>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute top-[140px] left-[20%] w-[20%] p-1"
                >
                  <div className="bg-[#2d7dd2]/10 text-[#2d7dd2] border border-[#2d7dd2]/20 text-xs p-2 rounded flex flex-col hover:bg-[#2d7dd2]/20 transition-colors">
                    <span className="font-semibold">Follow-up</span>
                    <span className="opacity-80">11:00 - 11:30</span>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute top-[220px] left-[60%] w-[20%] p-1"
                >
                  <div className="bg-[#1a2e44] text-white text-xs p-2 rounded flex flex-col shadow-sm hover:bg-[#0f1b29] transition-colors">
                    <span className="font-semibold">Surgery</span>
                    <span className="text-white/80">13:00 - 15:00</span>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
