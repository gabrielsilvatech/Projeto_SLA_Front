"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ticketData } from "@/lib/data"
import { Link } from "react-router-dom"

export function RecentTickets() {
  const recentTickets = [...ticketData]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "default"
      case "in-progress":
        return "warning"
      case "resolved":
        return "success"
      case "closed":
        return "secondary"
      default:
        return "default"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "secondary"
      case "medium":
        return "default"
      case "high":
        return "warning"
      case "critical":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Título</TableHead>
          <TableHead className="hidden md:table-cell">Tipo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Prioridade</TableHead>
          <TableHead className="hidden md:table-cell">Criado em</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentTickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
            <TableCell className="font-medium">{ticket.title}</TableCell>
            <TableCell className="hidden md:table-cell">{ticket.type}</TableCell>
            <TableCell>
              <Badge variant={getStatusColor(ticket.status)}>
                {ticket.status === "open" && "Aberto"}
                {ticket.status === "in-progress" && "Em Progresso"}
                {ticket.status === "resolved" && "Resolvido"}
                {ticket.status === "closed" && "Fechado"}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={getPriorityColor(ticket.priority)}>
                {ticket.priority === "low" && "Baixa"}
                {ticket.priority === "medium" && "Média"}
                {ticket.priority === "high" && "Alta"}
                {ticket.priority === "critical" && "Crítica"}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{ticket.createdAt}</TableCell>
            <TableCell className="text-right">
              <Link to={`/tickets/${ticket.id}`}>
                <Button variant="ghost" size="sm">
                  Ver
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

