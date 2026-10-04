import { useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, X, ChevronDown, Calendar } from "lucide-react";
import useDialog from "../hooks/useDialog";
import { EASE } from "./Reveal";

function localDate() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function Reservation({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "20:00", guests: "2", notes: "" });
  useDialog(true, ref, onClose);
  const update = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setError("");
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (new Date(`${form.date}T12:00:00`).getDay() === 1) {
      setError("Los lunes descansamos. Elige un d\u00eda entre martes y domingo.");
      return;
    }
    setReady(true);
  };
  const body = `Hola, Gin Palau.\n\nMe gustar\u00eda solicitar una mesa:\n\nNombre: ${form.name}\nEmail: ${form.email}\nFecha: ${form.date}\nHora: ${form.time}\nPersonas: ${form.guests}\nComentarios: ${form.notes || "Sin comentarios"}\n\nQuedo a la espera de vuestra confirmaci\u00f3n. Gracias.`;
  const emailUrl = `mailto:reservas@ginpalau.es?subject=${encodeURIComponent(`Solicitud de reserva | ${form.date} | ${form.guests} personas`)}&body=${encodeURIComponent(body)}`;

  return createPortal(
    <motion.div className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.div ref={ref} role="dialog" aria-modal="true" aria-labelledby="reservation-title" tabIndex={-1} className="reservation-dialog bg-zinc-950 border border-white/10" initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 8 }} transition={{ duration: 0.35, ease: EASE }}>
        <button className="dialog-close icon-button" onClick={onClose} aria-label="Cerrar reservas"><X size={21} strokeWidth={1.4} /></button>
        <p className="eyebrow">NOS VEMOS EN LA BARRA</p>
        <h2 id="reservation-title" className="dialog-heading">Una mesa.<br /><em>Una buena noche.</em></h2>
        {!ready ? (
          <>
            <p className="reservation-intro !text-sm md:!text-base">Cu&eacute;ntanos cu&aacute;ndo vienes. Prepararemos tu solicitud para enviarla por email.</p>
            <form onSubmit={submit} className="reservation-form">
              <label className="!text-xs !tracking-widest">Tu nombre<input className="!w-full !bg-transparent !px-4 !py-3 !text-sm md:!text-base" required autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Nombre y apellidos" maxLength={100} /></label>
              <label className="!text-xs !tracking-widest">Email<input className="!w-full !bg-transparent !px-4 !py-3 !text-sm md:!text-base" type="email" required autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="tu@email.com" maxLength={150} /></label>
              <div className="form-grid">
                <label className="!text-xs !tracking-widest">
                  Fecha
                  <div className="relative w-full">
                    <input className="!w-full !bg-transparent !px-4 !py-3 !pr-10 !border !border-white/20 !rounded-none !text-sm md:!text-base !appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" type="date" required min={localDate()} value={form.date} onChange={(event) => update("date", event.target.value)} style={{ colorScheme: "dark" }} />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50"><Calendar size={16} /></span>
                  </div>
                </label>
                <label className="!text-xs !tracking-widest">
                  Hora
                  <div className="relative w-full">
                    <select className="!w-full !bg-transparent !px-4 !py-3 !pr-10 !border !border-white/20 !rounded-none !text-sm md:!text-base !appearance-none" value={form.time} onChange={(event) => update("time", event.target.value)} style={{ colorScheme: "dark" }}>{["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"].map((time) => <option key={time} value={time} className="bg-[#121212] text-white">{time}</option>)}</select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50"><ChevronDown size={16} /></span>
                  </div>
                </label>
                <label className="!text-xs !tracking-widest">
                  Personas
                  <div className="relative w-full">
                    <select className="!w-full !bg-transparent !px-4 !py-3 !pr-10 !border !border-white/20 !rounded-none !text-sm md:!text-base !appearance-none" value={form.guests} onChange={(event) => update("guests", event.target.value)} style={{ colorScheme: "dark" }}>{[1, 2, 3, 4, 5, 6, 7, 8].map((number) => <option key={number} value={number} className="bg-[#121212] text-white">{number}</option>)}</select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50"><ChevronDown size={16} /></span>
                  </div>
                </label>
              </div>
              <label className="!text-xs !tracking-widest">Algo que debamos saber <span className="optional">(opcional)</span><textarea className="!w-full !bg-transparent !px-4 !py-3 !text-sm md:!text-base" rows={2} value={form.notes} onChange={(event) => update("notes", event.target.value)} placeholder="Preferencias, alergias, una ocasion especial..." maxLength={600} /></label>
              {error && <p className="form-error !text-sm" role="alert">{error}</p>}
              <button type="submit" className="button-gold !text-xs md:!text-sm !tracking-widest">Preparar solicitud <ArrowUpRight size={16} /></button>
              <p className="form-note !text-xs md:!text-sm">La reserva solo ser&aacute; v&aacute;lida tras la confirmaci&oacute;n de nuestro equipo. No se env&iacute;an datos hasta que pulses enviar en tu correo.</p>
            </form>
          </>
        ) : (
          <div className="reservation-ready">
            <p className="body-copy !text-sm md:!text-base">Tu solicitud est&aacute; lista, {form.name}. Envi&aacute;nosla desde tu aplicaci&oacute;n de correo y te responderemos para confirmar disponibilidad.</p>
            <dl className="reservation-summary"><div><dt className="!text-xs !tracking-widest">Fecha</dt><dd className="!text-sm md:!text-base">{new Date(`${form.date}T12:00:00`).toLocaleDateString("es-ES", { day: "numeric", month: "long" })}</dd></div><div><dt className="!text-xs !tracking-widest">Hora</dt><dd className="!text-sm md:!text-base">{form.time}</dd></div><div><dt className="!text-xs !tracking-widest">Personas</dt><dd className="!text-sm md:!text-base">{form.guests}</dd></div></dl>
            <a href={emailUrl} className="button-gold !text-xs md:!text-sm !tracking-widest">Enviar solicitud por email <ArrowUpRight size={16} /></a>
            <button className="text-link edit-reservation !text-xs" onClick={() => setReady(false)}><ArrowLeft size={14} /> Editar detalles</button>
            <p className="form-note !text-xs md:!text-sm">&iquest;Prefieres llamar? <a href="tel:+34934602307">+34 934 60 23 07</a></p>
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
}