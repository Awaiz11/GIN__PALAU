import { ArrowUpRight, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import Brand from "./Brand";

export default function Footer({ onReserve }: { onReserve: () => void }) {
  return (
    <footer className="site-footer bg-black">
      <div className="section-shell">
        <div className="footer-top">
          <div className="footer-brand"><Brand /><p className="!text-sm md:!text-base !text-white/70">Tu destino de cocteler&iacute;a.<br />Buenas copas, mejores noches.</p></div>
          <div className="footer-column">
            <h3 className="!text-[15px] md:!text-base !text-[#a49783]">Descubrir</h3>
            <Link className="!text-xs md:!text-sm !text-white/70" to="/#historia">La casa</Link>
            <Link className="!text-xs md:!text-sm !text-white/70" to="/menu">Carta de autor</Link>
            <Link className="!text-xs md:!text-sm !text-white/70" to="/#eventos">Eventos</Link>
            <button className="!text-xs md:!text-sm !text-white/70" onClick={onReserve}>Reservas <ArrowUpRight size={14} /></button>
          </div>
          <div className="footer-column footer-contact">
            <h3 className="!text-[15px] md:!text-base !text-[#a49783]">Nos vemos en Barcelona</h3>
            <a className="!text-xs md:!text-sm !text-white/70" href="https://www.google.com/maps/search/?api=1&query=Carrer+de+Mallorca+352+Barcelona" target="_blank" rel="noopener noreferrer">Carrer de Mallorca 352<br />Eixample, Barcelona <ArrowUpRight size={14} /></a>
            <a className="!text-xs md:!text-sm !text-white/70" href="tel:+34934602307">+34 934 60 23 07</a>
            <a className="!text-xs md:!text-sm !text-white/70" href="mailto:reservas@ginpalau.es">reservas@ginpalau.es</a>
          </div>
          <div className="footer-column">
            <h3 className="!text-[15px] md:!text-base !text-[#a49783]">Cuando cae el sol</h3>
            <p className="!text-xs md:!text-sm !text-white/70">Martes a domingo<br />18:00 &ndash; 02:30</p>
            <p className="footer-muted !text-xs md:!text-sm !text-white/50">Lunes, descansamos.</p>
          </div>
        </div>
        <p className="footer-wordmark" aria-hidden="true">LE ROCHER</p>
        <div className="footer-bottom">
          <span className="!text-[10px] md:!text-xs">&copy; {new Date().getFullYear()} Le Rocher. Barcelona.</span>
          <span className="footer-signature !text-[10px] md:!text-xs">EL ARTE DEL GIN TONIC, DESDE 2014.</span>
          <Link to="/" className="back-top !text-[10px] md:!text-xs !tracking-widest">Volver arriba <ArrowUp size={14} /></Link>
        </div>
      </div>
    </footer>
  );
}