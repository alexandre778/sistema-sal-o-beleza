"use client";

import { useState } from "react";
import Link from "next/link";

type FormAgendamento = {
  nome: string;
  telefone: string;
  servico: string;
  data: string;
  horario: string;
};

export default function Agendamentos() {
  const [form, setForm] = useState<FormAgendamento>({
    nome: "",
    telefone: "",
    servico: "Manicure",
    data: "",
    horario: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao agendar.");
        return;
      }

      alert("Agendamento realizado com sucesso!");

      setForm({
        nome: "",
        telefone: "",
        servico: "Manicure",
        data: "",
        horario: "",
      });
    } catch (error: unknown) {
      console.error(error);
      alert("Erro ao agendar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={{ textAlign: "center" }}>B Martins - Agendamento</h1>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
            style={inputStyle}
          />

          <input
            placeholder="Telefone"
            value={form.telefone}
            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            required
            style={inputStyle}
          />

          <select
            value={form.servico}
            onChange={(e) => setForm({ ...form, servico: e.target.value })}
            style={inputStyle}
          >
            <option>Manicure</option>
            <option>Pedicure</option>
          </select>

          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
            required
            style={inputStyle}
          />

          <input
            type="time"
            value={form.horario}
            onChange={(e) => setForm({ ...form, horario: e.target.value })}
            required
            style={inputStyle}
          />

          <button disabled={loading} style={button}>
            {loading ? "Agendando..." : "Agendar Horário"}
          </button>
        </form>

        <Link href="/" style={link}>
          ← Voltar
        </Link>
      </div>
    </div>
  );
}

// estilos
const container: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#dca39b",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card: React.CSSProperties = {
  width: 400,
  background: "rgba(255,255,255,0.15)",
  padding: 30,
  borderRadius: 20,
  color: "#fff",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 15,
};

const inputStyle: React.CSSProperties = {
  padding: 10,
  borderRadius: 8,
  border: "none",
};

const button: React.CSSProperties = {
  padding: 12,
  background: "#fff",
  color: "#dca39b",
  borderRadius: 30,
  fontWeight: "bold",
};

const link: React.CSSProperties = {
  display: "block",
  marginTop: 20,
  textAlign: "center",
  background: "#fff",
  color: "#dca39b",
  padding: 10,
  borderRadius: 30,
};
