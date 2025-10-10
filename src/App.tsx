import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import ForYou from "./pages/ForYou";
import Profile from "./pages/Profile";
import AddEvent from "./pages/AddEvent";
import EventInput from "./pages/EventInput";
import Mitwirken from "./pages/Mitwirken";
import Dialog from "./pages/Dialog";
import Admin from "./pages/Admin";
import Impressum from "./pages/Impressum";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background flex flex-col">
          <Navigation />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<AboutUs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/event-input" element={<EventInput />} />
              <Route path="/mitwirken" element={<Mitwirken />} />
              <Route path="/dialog" element={<Dialog />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/for-you" element={<ForYou />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-event" element={<AddEvent />} />
              <Route path="/impressum" element={<Impressum />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
