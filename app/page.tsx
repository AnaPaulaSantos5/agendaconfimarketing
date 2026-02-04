"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion, AnimatePresence } from 'framer-motion';

export default function MarketingHub() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    start: '', titulo: '', wa: '4599992869@u.s', tipo: 'Externo', cor: '#f5886c', legenda: ''
  });

  const handleDateClick = (arg: any) => {
    setFormData({ ...formData, start: arg.dateStr });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen p-8 lg:p-14 flex flex-col gap-12">
      
      {/* 1. HEADER GESTÃO (FOTO 3) */}
      <header className="max-w-7xl mx-auto w-full neo-border bg-white rounded-[60px] p-10 flex items-center gap-10 neo-shadow relative overflow-hidden h-48">
        <div className="flex items-center gap-8 border-r-6 border-black pr-10">
          <button className="text-5xl hover:rotate-90 transition-all duration-500">⚙️</button>
          <div className="w-24 h-24 rounded-full border-6 border-black bg-white flex items-center justify-center overflow-hidden shadow-[6px_6px_0px_0px_black]">
            {session?.user?.image ? (
              <img src={session.user.image} className="w-full h-full object-cover" />
            ) : (
              <span className="font-black text-5xl italic">{session?.user?.name?.charAt(0) || "A"}</span>
            )}
          </div>
          <button className="text-4xl">▼</button>
        </div>

        <div className="flex-1">
          <div className="border-4 border-black rounded-[35px] px-8 py-3 inline-block bg-white shadow-[5px_5px_0px_0px_black]">
            <h1 className="font-black text-3xl uppercase italic tracking-tighter leading-none">Editar Cliente</h1>
            <p className="font-black text-xl uppercase mt-1">IMPREASE TRONITRO</p>
          </div>
          <div className="flex gap-8 mt-3 text-[10px] font-black uppercase opacity-30 italic ml-4">
            <span>Nome do Cliente</span>
            <span>WhatsApp ID</span>
            <span>Email do Google</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 font-black italic">
          <p className="text-sm underline cursor-pointer">Adicionar foto do dispositivo</p>
          <div className="w-52 h-16 border-4 border-black border-dashed rounded-[25px] flex items-center justify-center bg-gray-50/50">
             <span className="text-[10px] opacity-40 uppercase">Carregar Capa</span>
          </div>
        </div>
      </header>

      {/* 2. TIMELINE NAVEGAÇÃO (FOTO 3) */}
      <div className="max-w-7xl mx-auto w-full flex items-center gap-8">
        <span className="text-5xl cursor-pointer">◀</span>
        <h2 className="text-[10rem] font-black uppercase italic tracking-tighter leading-none">Mês</h2>
        <div className="flex-1 h-4 bg-black rounded-full"></div>
        <h2 className="text-[10rem] font-black italic tracking-tighter opacity-10 leading-none">2026</h2>
        <span className="text-5xl cursor-pointer">▶</span>
      </div>

      {/* 3. AGENDA GRID */}
      <main className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3 space-y-6">
          <p className="font-black italic uppercase text-2xl ml-4 opacity-40">Contas Ativas</p>
          {["Confi", "Luiza"].map((p, i) => (
            <div key={p} className={`p-8 border-6 border-black rounded-[45px] flex flex-col items-center gap-4 ${i === 0 ? 'bg-white neo-shadow' : 'opacity-20 bg-white/40'}`}>
              <div className="w-20 h-20 rounded-full border-4 border-black bg-gray-200"></div>
              <span className="font-black text-3xl uppercase italic tracking-tighter leading-none">{p}</span>
            </div>
          ))}
        </aside>

        <div className="lg:col-span-9">
          <FullCalendar 
            plugins={[daygridPlugin, interactionPlugin]} 
            initialView="dayGridMonth"
            locale="pt-br"
            headerToolbar={false}
            dateClick={handleDateClick}
          />
        </div>
      </main>

      {/* 4. MODAL NOVO EVENTO (CENTRALIZADO - FOTO 3) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 100 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 100 }}
              className="relative bg-white border-8 border-black p-14 max-w-2xl w-full rounded-[80px] modal-shadow"
            >
              <div className="flex justify-between items-center mb-10 border-b-8 border-black pb-6">
                <h3 className="font-black text-6xl italic uppercase tracking-tighter">Novo Post</h3>
                <div className="flex gap-3">
                  {['#f5886c', '#1260c7', '#ffce0a'].map(c => (
                    <button key={c} onClick={() => setFormData({...formData, cor: c})} className={`w-10 h-10 rounded-full border-4 border-black ${formData.cor === c ? 'scale-125 border-white shadow-[0_0_0_4px_black]' : 'opacity-30'}`} style={{ backgroundColor: c }} />
                  ))}
                  <span className="text-5xl font-black ml-4 cursor-pointer hover:rotate-90 transition-all">⊕</span>
                </div>
              </div>

              <div className="space-y-8 font-black uppercase italic">
                <div className="flex gap-4">
                  <button onClick={() => setFormData({...formData, tipo: 'Externo'})} className={`flex-1 py-5 border-6 border-black rounded-[30px] text-2xl ${formData.tipo === 'Externo' ? 'bg-black text-white' : 'opacity-20'}`}>Externo</button>
                  <button onClick={() => setFormData({...formData, tipo: 'Interno'})} className={`flex-1 py-5 border-6 border-black rounded-[30px] text-2xl ${formData.tipo === 'Interno' ? 'bg-black text-white' : 'opacity-20'}`}>Interno</button>
                </div>

                <input value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} className="w-full bg-transparent border-b-8 border-black outline-none text-7xl tracking-tighter placeholder:opacity-10" placeholder="TÍTULO..." />

                <div className="bg-[#fff9c4] border-6 border-black rounded-[45px] p-8 shadow-[12px_12px_0px_0px_black] rotate-[-1.5deg]">
                   <p className="text-[10px] opacity-40 mb-1">WhatsApp ID Enviando:</p>
                   <p className="text-3xl text-blue-700 underline tracking-tighter font-mono leading-none">{formData.wa}</p>
                </div>

                <textarea value={formData.legenda} onChange={e => setFormData({...formData, legenda: e.target.value})} className="w-full h-40 border-6 border-black rounded-[45px] p-8 bg-gray-50 outline-none resize-none text-xl" placeholder="CONTEÚDO SECUNDÁRIO..." />

                <div className="flex gap-12 pt-8 text-5xl border-t-8 border-black">
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