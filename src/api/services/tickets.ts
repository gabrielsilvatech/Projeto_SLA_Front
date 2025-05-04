import { toast } from "sonner";
import axiosInstance from "../config";

<<<<<<< HEAD
export interface Ticket {
  name: string,
  description: string,
  agency: number,
  priority: number,
  status_ticket: number,
  id_creator: string
}


export interface TicketResponse {
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
=======
export interface Ticket{
    name: string,
    description: string,
    agency: 1,
    priority: 1,
    status_ticket: 1,
    id_creator: string
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
>>>>>>> b730471c3be1af98a8972ba3e7fb0a52b3fe87a9
}