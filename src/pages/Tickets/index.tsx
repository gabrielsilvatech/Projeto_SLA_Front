import { AppHeader } from "@/components/app-header";
import { RecentTickets } from "@/components/recent-tickets";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";


export default function Tickets() {
    return (
        <div className="flex h-screen flex-col">
            <AppHeader />
            <main className="p-4 md:p-6 bg-gray-100">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-x-4">

                            <Link to="/dashboard">
                                <ArrowLeft size={24} />
                            </Link>
                            <h1 className="text-2xl font-bold tracking-tight">Tickets</h1>
                        </div>
                        <p className="text-muted-foreground"> Últimos tickets abertos ou atualizados</p>

                    </div>
                    <Card>
                        <CardContent>
                            <RecentTickets />
                        </CardContent>

                    </Card>
                </div>
            </main>
        </div>

    )
}

