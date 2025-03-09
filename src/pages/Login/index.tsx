"use client"

import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TicketCheck } from 'lucide-react'

import { TabsLogin } from "./tabs-login"
import { TabsRegister } from "./tabs-register"

export default function Login() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/50 p-4">
      <Link to="/" className="absolute left-4 top-4 flex items-center gap-2 md:left-8 md:top-8">
        <TicketCheck className="h-6 w-6" />
        <span className="font-bold">TicketFlow</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Acesso ao Sistema</CardTitle>
          <CardDescription>Entre com suas credenciais para acessar o sistema de tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>
            <TabsLogin />
            <TabsRegister />

          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Ao continuar, você concorda com os{" "}
            <Link to="#" className="underline underline-offset-4 hover:text-primary">
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link to="#" className="underline underline-offset-4 hover:text-primary">
              Política de Privacidade
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
