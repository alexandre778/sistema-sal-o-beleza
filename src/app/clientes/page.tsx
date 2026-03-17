"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Agendamento = {
  id: string;
  nome: string;
  telefone: string;
  servico: string;
  data: string;
  horario: string;
};

export default function Clientes() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    async function carregar() {
      const res = await fetch("/api/agendamentos");
      const data: Agendamento[] = await res.json();
      setAgendamentos(data);
    }

    carregar();
  }, []);

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={{ textAlign: "center" }}>👥 Clientes Agendados</h1>

        {agendamentos.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            Nenhum agendamento encontrado.
          </p>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Serviço</th>
                <th>Data</th>
                <th>Horário</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map((a) => (
                <tr key={a.id}>
                  <td>{a.nome}</td>
                  <td>{a.telefone}</td>
                  <td>{a.servico}</td>
                  <td>{a.data}</td>
                  <td>{a.horario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Link href="/" style={link}>
          ← Voltar
        </Link>
      </div>
    </div>
  );
}

const container: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#dca39b",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card: React.CSSProperties = {
  width: "90%",
  maxWidth: 900,
  background: "rgba(255,255,255,0.15)",
  padding: 30,
  borderRadius: 20,
  color: "#fff",
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
