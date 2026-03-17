"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Agendamento {
  id: string;
  nome: string;
  telefone: string;
  servico: string;
  data: string;
  horario: string;
}

export default function Dashboard() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    fetch("/api/agendamentos")
      .then((res) => res.json())
      .then((data) => setAgendamentos(data));
  }, []);

  // 🔢 Contagem por serviço
  const resumo = [
    {
      name: "Manicure",
      total: agendamentos.filter((a) => a.servico === "Manicure").length,
    },
    {
      name: "Pedicure",
      total: agendamentos.filter((a) => a.servico === "Pedicure").length,
    },
  ];

  return (
    <div style={{ padding: 30 }}>
      <h1>📊 Dashboard - B Martins</h1>

      {/* 🔹 Gráfico */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={resumo}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 Lista de Agendamentos */}
      <h2 style={{ marginTop: 40 }}>📅 Lista de Agendamentos</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 10,
        }}
      >
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
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
    </div>
  );
}