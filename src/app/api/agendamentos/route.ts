// src/app/api/agendamentos/route.ts
const globalForAgendamentos = globalThis as unknown as {
  agendamentos?: Agendamento[];
};

if (!globalForAgendamentos.agendamentos) {
  globalForAgendamentos.agendamentos = [];
}

interface Agendamento {
  id: string;
  nome: string;
  telefone: string;
  servico: string;
  data: string;
  horario: string;
}

export async function GET() {
  return Response.json(globalForAgendamentos.agendamentos);
}

export async function POST(req: Request) {
  const data: Omit<Agendamento, "id"> = await req.json();

  const existe = globalForAgendamentos.agendamentos!.find(
    (a) => a.data === data.data && a.horario === data.horario
  );

  if (existe) {
    return new Response(
      JSON.stringify({ error: "Horário já agendado para essa data." }),
      { status: 400 }
    );
  }

  const novo: Agendamento = {
    id: crypto.randomUUID(),
    ...data,
  };

  globalForAgendamentos.agendamentos!.push(novo);

  return Response.json(novo);
}
