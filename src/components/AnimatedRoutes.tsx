import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import AboutUs from '@/pages/AboutUs';
import Events from '@/pages/Events';
import EventDetail from '@/pages/EventDetail';
import ForYou from '@/pages/ForYou';
import Profile from '@/pages/Profile';
import AddEvent from '@/pages/AddEvent';
import EventInput from '@/pages/EventInput';
import Mitwirken from '@/pages/Mitwirken';
import Dialog from '@/pages/Dialog';
import Admin from '@/pages/Admin';
import Impressum from '@/pages/Impressum';
import NotFound from '@/pages/NotFound';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="flex-1 animate-page-enter motion-reduce:animate-none">
      <Routes location={location}>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AnimatedRoutes;
