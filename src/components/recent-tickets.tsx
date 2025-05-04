"use client"

import { useEffect, useState } from "react"
import { ListTickets, type TicketResponse } from "@/api/services/tickets"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

export function RecentTickets() {
  const [tickets, setTickets] = useState<TicketResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [page, setPage] = useState(1)
  const limit = 5
  const skip = (page - 1) * limit

  useEffect(() => {
    async function fetchTickets() {
      setIsLoading(true)
      try {
        const response = await ListTickets({ skip, limit })
        if (response) {
          setTickets(response)

          const total = response.total || 20 
          setTotalItems(total)
          setTotalPages(Math.ceil(total / limit))
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchTickets()
  }, [page])

  type BadgeVariant = "default" | "secondary" | "outline" | "destructive" | null | undefined

  const getStatusColor = (status: string): BadgeVariant => {
    switch (status) {
      case "open":
        return "default"
      case "in-progress":
        return "secondary"
      case "resolved":
        return "outline"
      case "closed":
        return "destructive"
      default:
        return "default"
    }
  }

  const getPriorityColor = (priority: string): BadgeVariant => {
    switch (priority) {
      case "low":
        return "secondary"
      case "medium":
        return "default"
      case "high":
        return "outline"
      case "critical":
        return "destructive"
      default:
        return "default"
    }
  }

  const goToPage = (pageNumber: number) => {
    setPage(Math.max(1, Math.min(pageNumber, totalPages)))
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)

      let startPage = Math.max(2, page - 1)
      let endPage = Math.min(totalPages - 1, page + 1)

      if (page <= 3) {
        endPage = Math.min(totalPages - 1, 4)
      }

      if (page >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3)
      }

      if (startPage > 2) {
        pageNumbers.push("...")
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...")
      }

      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead className="hidden md:table-cell">Descrição</TableHead>
            <TableHead>Agência</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Criado por</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  <p className="text-sm text-muted-foreground">Carregando tickets...</p>
                </div>
              </TableCell>
            </TableRow>
          ) : tickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                <p className="text-muted-foreground">Nenhum ticket encontrado</p>
              </TableCell>
            </TableRow>
          ) : (
            tickets.map((ticket, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{ticket.title}</TableCell>
                <TableCell className="hidden md:table-cell max-w-xs truncate">{ticket.description}</TableCell>
                <TableCell className="hidden md:table-cell">{ticket.agency}</TableCell>
                <TableCell>
                  <Badge variant={getPriorityColor(ticket.priority)} className="capitalize">
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(ticket.status_ticket)} className="capitalize">
                    {ticket.status_ticket.replace("-", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{ticket.creator}</TableCell>
                <TableCell className="text-right">
                  <Link to={`/tickets/${ticket.title}`}>
                    <Button variant="ghost" size="sm">
                      Ver
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Mostrando <span className="font-medium">{tickets.length > 0 ? skip + 1 : 0}</span> a{" "}
          <span className="font-medium">{Math.min(skip + tickets.length, totalItems)}</span> de{" "}
          <span className="font-medium">{totalItems}</span> tickets
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(1)}
            disabled={page === 1 || isLoading}
            className="hidden sm:flex"
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button variant="outline" size="icon" onClick={() => goToPage(page - 1)} disabled={page === 1 || isLoading}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          <div className="flex items-center">
            {getPageNumbers().map((pageNum, i) =>
              typeof pageNum === "number" ? (
                <Button
                  key={i}
                  variant={page === pageNum ? "default" : "outline"}
                  size="icon"
                  onClick={() => goToPage(pageNum)}
                  disabled={isLoading}
                  className="h-8 w-8 sm:h-9 sm:w-9"
                >
                  {pageNum}
                </Button>
              ) : (
                <span key={i} className="px-2 text-muted-foreground">
                  {pageNum}
                </span>
              ),
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages || isLoading}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(totalPages)}
            disabled={page === totalPages || isLoading}
            className="hidden sm:flex"
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
