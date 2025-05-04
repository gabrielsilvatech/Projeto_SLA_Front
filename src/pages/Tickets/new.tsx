"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateTicket } from "@/api/services/tickets"

const ticketFormSchema = z.object({
    name: z.string().min(3, {
        message: "O nome do ticket deve ter pelo menos 3 caracteres.",
    }),
    description: z.string().min(10, {
        message: "A descrição deve ter pelo menos 10 caracteres.",
    }),
    agency: z.coerce.number().int().positive(),
    priority: z.coerce.number().int().min(1).max(5),
    status_ticket: z.coerce.number().int().positive(),
    id_creator: z.string().min(1, {
        message: "ID do criador é obrigatório.",
    }),
})

type TicketFormValues = z.infer<typeof ticketFormSchema>

const defaultValues: TicketFormValues = {
    name: "",
    description: "",
    agency: 1,
    priority: 1,
    status_ticket: 1,
    id_creator: "",
}

export const NewTicket = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<TicketFormValues>({
        resolver: zodResolver(ticketFormSchema),
        defaultValues,
    })

    async function onSubmit(data: TicketFormValues) {
        setIsSubmitting(true)
        try {
            await CreateTicket(data)
            form.reset(defaultValues)
        } finally {
            setIsSubmitting(false)

            form.reset(defaultValues)
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <AppHeader />
            <main className="p-4 md:p-6 bg-gray-100">
                <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold tracking-tight">Novo Ticket</h1>
                        <p className="text-muted-foreground">Preencha o formulário abaixo para criar um novo ticket.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome do Ticket</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Digite o nome do ticket" {...field} />
                                            </FormControl>
                                            <FormDescription>Um título breve e descritivo para o ticket.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descrição</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Descreva o problema ou solicitação em detalhes"
                                                    className="min-h-[120px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Forneça detalhes suficientes para que a equipe possa entender o problema.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="agency"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Agência</FormLabel>
                                                <Select
                                                    onValueChange={(value) => field.onChange(Number.parseInt(value))}
                                                    defaultValue={field.value?.toString()}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione a agência" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1">Agência 1</SelectItem>
                                                        <SelectItem value="2">Agência 2</SelectItem>
                                                        <SelectItem value="3">Agência 3</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="priority"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Prioridade</FormLabel>
                                                <Select
                                                    onValueChange={(value) => field.onChange(Number.parseInt(value))}
                                                    defaultValue={field.value?.toString()}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione a prioridade" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1">Urgente</SelectItem>
                                                        <SelectItem value="3">Alta</SelectItem>
                                                        <SelectItem value="2">Normal</SelectItem>
                                                        <SelectItem value="4">Baixa</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>Todos os tickets são marcados como Urgente por padrão.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="status_ticket"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select
                                                    onValueChange={(value) => field.onChange(Number.parseInt(value))}
                                                    defaultValue={field.value?.toString()}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione o status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1">Aberto</SelectItem>
                                                        <SelectItem value="2">Fechado</SelectItem>
                                                        <SelectItem value="3">Resolvido</SelectItem>
                                                        <SelectItem value="4">Em Andamento</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="id_creator"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>ID do Criador</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Digite o ID do criador" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex justify-end gap-3">
                                    <Button variant="outline" type="button" onClick={() => form.reset(defaultValues)}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Criando..." : "Criar Ticket"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </main>
        </div>
    )
}

