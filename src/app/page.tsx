import Link from "next/link";
import "./home.css";

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>B Martins</h1>
          <p>Manicure & Pedicure com elegância e cuidado profissional.</p>

          <div style={{ display: "flex", gap: 15, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/agendamentos" className="btn-primary">
              Agendar Horário
            </Link>

            <Link href="/clientes" className="btn-primary">
              Ver Clientes Agendados
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}