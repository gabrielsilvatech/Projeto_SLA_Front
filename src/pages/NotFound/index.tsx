"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Home, Search, TicketX } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"

interface NotFoundProps {
  title?: string
  description?: string
  showBackButton?: boolean
  showHomeButton?: boolean
  showSearchButton?: boolean
  customAction?: React.ReactNode
}

export const NotFound = ({
  title = "Página não encontrada",
  description = "Desculpe, não conseguimos encontrar a página que você está procurando.",
  showBackButton = true,
  showHomeButton = true,
  showSearchButton = false,
  customAction
}: NotFoundProps) => {
  const router = useNavigate()

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-muted p-6">
              <TicketX className="h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <Button 
              variant="outline" 
              className="w-full sm:w-auto" 
              asChild
            >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>


        </CardFooter>
      </Card>
    </div>
  )
}
