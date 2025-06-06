import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import Login from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import Tickets from "@/pages/Tickets";
import { NewTicket } from "./pages/Tickets/new";
import Ticket from "./pages/Tickets/ticket";

function App() {
  return (
    <Router>
       <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/new" element={<NewTicket />} />
        <Route path="/tickets/:title" element={<Ticket />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
