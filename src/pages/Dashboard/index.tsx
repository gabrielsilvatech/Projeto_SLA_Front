"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BarChart3, Filter, LayoutDashboard, Plus, TicketCheck } from "lucide-react"
import { AppHeader } from "@/components/app-header"
import { TicketStatusChart } from "@/components/ticket-status-chart"
import { TicketTypeChart } from "@/components/ticket-type-chart"
import { RecentTickets } from "@/components/recent-tickets"
import { TicketMetrics } from "@/components/ticket-metrics"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (

    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="p-4 md:p-6 bg-gray-100">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Visão geral do sistema de tickets e métricas principais.</p>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline-block">Visão Geral</span>
                </TabsTrigger>
                <TabsTrigger value="tickets" className="flex items-center gap-2">
                  <TicketCheck className="h-4 w-4" />
                  <span className="hidden sm:inline-block">Tickets</span>
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline-block">Relatórios</span>
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline-block">Filtrar</span>
                </Button>
                <Link to="/tickets/new">
                  <Button size="sm" className="h-8 gap-1">
                    <Plus className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline-block">Novo Ticket</span>
                  </Button>
                </Link>
              </div>
            </div>

            <TabsContent value="overview" className="space-y-4">
              <TicketMetrics />

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Status dos Tickets</CardTitle>
                    <CardDescription>Distribuição de tickets por status atual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TicketStatusChart />
                  </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Tipos de Ticket</CardTitle>
                    <CardDescription>Distribuição por categoria</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TicketTypeChart />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Tickets Recentes</CardTitle>
                  <CardDescription>Últimos tickets abertos ou atualizados</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentTickets />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tickets" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="w-full flex items-center justify-between">
                    <CardTitle>Lista de Tickets</CardTitle>
                    <Link to="/tickets">
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                  <CardDescription>Gerencie todos os tickets do sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Esta seção mostrará uma tabela completa com todos os tickets, incluindo filtros avançados e
                    opções de gerenciamento.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios e Análises</CardTitle>
                  <CardDescription>Métricas detalhadas e relatórios exportáveis</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Esta seção permitirá gerar relatórios personalizados, exportar dados em diferentes formatos e
                    visualizar métricas avançadas.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

