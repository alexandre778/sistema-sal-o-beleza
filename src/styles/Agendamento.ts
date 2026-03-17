export interface Agendamento {
  id?: string;
  nome: string;
  telefone: string;
  servico: "Manicure" | "Pedicure";
  data: string;
  horario: string;
}