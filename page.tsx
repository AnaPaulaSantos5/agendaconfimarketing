"use client";

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion, AnimatePresence } from 'framer-motion';

export default function MarketingHub() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    start: '', titulo: '', wa: '4599992869@u.s', tipo: 'Externo', cor: '#f5886c', legenda: ''
  });

  return (
    <div className="min-h-screen bg-[#f4ece1] p-6 lg:p-16 font-causten antialiased text-black">
      
      {/* 1. HEADER (FOTO 3) */}
      <header className="max-w-7xl mx-auto border-[8px] border-black bg-white rounded-[60px] p-10 mb-16 flex items-center gap-10 shadow-[20px_20px_0px_0px_black] relative h-48">
        <div className="flex items-center gap-8 border-r-8 border-black pr-10">
          <button className="text-5xl hover:rotate-90 transition-transform duration-500">⚙️</button>
          <div className="w-24 h-24 rounded-full border-8 border-black bg-white flex items-center justify-center font-black text-5xl italic shadow-[6px_6px_0px_0px_black]">A</div>
        </div>
        <div className="flex-1">
          <div className="border-[6px] border-black rounded-[35px] px-8 py-3 inline-block bg-white shadow-[6px_6px_0px_0px_black]">
            <h1 className="font-black text-4xl uppercase italic tracking-tighter leading-none">Editar Cliente</h1>
            <p className="font-black text-2xl uppercase mt-1">IMPREASE TRONITRO</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3 font-black italic">
          <p className="text-sm underline decoration-[3px] cursor-pointer">Adicionar foto do dispositivo</p>
          <div className="w-64 h-20 border-[6px] border-black border-dashed rounded-[30px] flex items-center justify-center bg-gray-50/50 text-[11px] opacity-40 uppercase">Carregar Capa</div>
        </div>
      </header>

      {/* 2. TIMELINE (FOTO 3) */}
      <div className="max-w-7xl mx-auto flex items-center gap-10 mb-20 text-black">
        <h2 className="text-[10rem] font-black uppercase italic tracking-tighter leading-none">Mês</h2>
        <div className="flex-1 h-5 bg-black rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]"></div>
        <h2 className="text-[10rem] font-black italic tracking-tighter opacity-10 leading-none">2026</h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <aside className="lg:col-span-3 space-y-10">
          <div className="p-12 border-[8px] border-black rounded-[55px] bg-white shadow-[18px_18px_0px_0px_black] flex flex-col items-center gap-6">
             <div className="w-24 h-24 rounded-full border-4 border-black bg-gray-100"></div>
             <span className="font-black text-4xl uppercase italic tracking-tighter leading-none">Confi</span>
          </div>
        </aside>

        <main className="lg:col-span-9 bg-white border-[10px] border-black rounded-[80px] p-10 overflow-hidden shadow-sm">
          <FullCalendar 
            plugins={[daygridPlugin, interactionPlugin]} 
            initialView="dayGridMonth"
            locale="pt-br"
            headerToolbar={false}
            dateClick={(arg) => { setFormData({...formData, start: arg.dateStr}); setIsModalOpen(true); }}
          />
        </main>
      </div>

      {/* 3. MODAL (CENTRALIZADO) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xl p-6">
            <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 150 }} animate={{ scale: 1, opacity: 1, y: 0 }}
              className="relative bg-white border-[10px] border-black p-16 max-w-2xl w-full rounded-[90px] shadow-[40px_40px_0px_0px_black]"
            >
              <div className="flex justify-between items-center mb-10 border-b-8 border-black pb-6">
                <h3 className="font-black text-6xl italic uppercase tracking-tighter leading-none">Post Agenda</h3>
                <div className="flex gap-4">
                  {['#f5886c', '#1260c7', '#ffce0a'].map(c => (
                    <button key={c} onClick={() => setFormData({...formData, cor: c})} className={`w-12 h-12 rounded-full border-4 border-black ${formData.cor === c ? 'scale-125 border-white shadow-[0_0_0_4px_black]' : 'opacity-30'}`} style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>

              <div className="space-y-10 font-black uppercase italic">
                <input className="w-full bg-transparent border-b-[10px] border-black outline-none text-7xl tracking-tighter placeholder:opacity-10" placeholder="TÍTULO..." />
                <div className="bg-[#fff9c4] border-[7px] border-black rounded-[50px] p-8 shadow-[15px_15px_0px_0px_black] rotate-[-1.5deg]">
                   <p className="text-sm opacity-40 mb-2">WhatsApp ID:</p>
                   <p className="text-3xl text-blue-700 underline font-mono">{formData.wa}</p>
                </div>
                <div className="flex gap-12 pt-10 text-5xl border-t-8 border-black">
                  <button onClick={() => setIsModalOpen(false)} className="hover:underline decoration-[12px] decoration-yellow-400">SALVAR</button>
                  <button onClick={() => setIsModalOpen(false)} className="opacity-20">FECHAR</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}