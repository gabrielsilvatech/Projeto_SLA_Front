import { toast } from "sonner";
import axiosInstance from "../config";

export interface Ticket {
  name: string,
  description: string,
  agency: number,
  priority: number,
  status_ticket: number,
  id_creator: string
}


export interface TicketResponse {
  id: string,
  title: string,
  description: string,
  agency: string,
  priority: string,
  status_ticket: string,
  creator: string
}

export async function CreateTicket(data: Ticket) {
  try {
    const response = await axiosInstance.post('/create_ticket', data)

    if (response.data.SUCCESS) {
      toast.success("Ticket cadastrado com sucesso!")
    }
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 422 && Array.isArray(data.detail)) {
        const missingFields = data.detail.map((item: any) => item.loc.at(-1)).join(', ');
        toast.error(missingFields);
      }

    } else if (error.request) {
      console.error('Network error:', error.request);
    } else {
      console.error('Error:', error.message)
    }
  }
}
export async function ListTickets(data: { skip: number, limit: number }) {
  try {
    const response = await axiosInstance.post('/list_tickets', data)

    if (response.data.SUCCESS) {
      toast.success("Ticket cadastrado com sucesso!")
    }

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 422 && Array.isArray(data.detail)) {
        const missingFields = data.detail.map((item: any) => item.loc.at(-1)).join(', ');
        toast.error(missingFields);
      }

    } else if (error.request) {
      console.error('Network error:', error.request);
    } else {
      console.error('Error:', error.message)
    }
  }
}
export async function CloseTicket(data: { id_ticket: string, status_ticket: number }) {
  try {
    const response = await axiosInstance.post('/close_ticket', data)

    if (response.data.SUCCESS) {
      toast.success("Ticket marcado como resolvido com sucesso!")
    }

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 422 && Array.isArray(data.detail)) {
        const missingFields = data.detail.map((item: any) => item.loc.at(-1)).join(', ');
        toast.error(`Erro ao fechar ticket: ${missingFields}`);
      } else {
        toast.error("Erro ao fechar ticket");
      }

    } else if (error.request) {
      console.error('Network error:', error.request);
    } else {
      console.error('Error:', error.message)
    }

    throw error;
  }
}