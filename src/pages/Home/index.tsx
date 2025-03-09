
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, MessageSquare, TicketCheck } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-purple-200 relative">
      <header className="bg-primary px-4 py-3 flex items-center justify-between fixed w-full">
        <div className="flex items-center gap-2">
          <TicketCheck className="h-6 w-6 text-primary-foreground" />
          <h2 className="text-lg font-bold text-primary-foreground">TicketFlow</h2>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Sistema de Tickets para Melhorias e Reclamações
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Organize demandas, acompanhe soluções e melhore processos internos com nosso sistema de tickets.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/login">
                  <Button size="lg" className="gap-1">
                   Cadastre-se
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <MessageSquare className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Registre Solicitações</CardTitle>
                  <CardDescription>
                    Crie tickets para reclamações, sugestões de melhoria ou problemas técnicos.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Categorize por tipo e prioridade, adicione descrições detalhadas e anexe arquivos quando necessário.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/tickets/new">
                    <Button variant="outline" size="sm" className="text-gray-100">
                      Criar Ticket
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <TicketCheck className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Acompanhe o Progresso</CardTitle>
                  <CardDescription>Visualize o status e histórico completo de cada ticket.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Acompanhe o ciclo de vida do ticket desde a abertura até a resolução, com atualizações em tempo
                    real.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/tickets">
                    <Button variant="outline" size="sm"  className="text-gray-100">
                      Ver Tickets
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <BarChart3 className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Analise Métricas</CardTitle>
                  <CardDescription>Acesse relatórios e estatísticas sobre os tickets.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Visualize dados sobre tempo médio de resolução, tipos mais frequentes e distribuição por
                    departamento.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm"  className="text-gray-100">
                      Ver Dashboard
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/50 py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} TicketFlow. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

