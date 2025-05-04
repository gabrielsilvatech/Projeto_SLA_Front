import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import Login from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import Tickets from "@/pages/Tickets";
import { NewTicket } from "./pages/Tickets/new";
<<<<<<< HEAD
import Ticket from "./pages/Tickets/ticket";
=======
>>>>>>> b730471c3be1af98a8972ba3e7fb0a52b3fe87a9

function App() {
  return (
    <Router>
       <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/new" element={<NewTicket />} />
<<<<<<< HEAD
        <Route path="/tickets/:title" element={<Ticket />} />
=======
>>>>>>> b730471c3be1af98a8972ba3e7fb0a52b3fe87a9
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
