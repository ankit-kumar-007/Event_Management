import { Routes, Route } from 'react-router-dom';

import Home from '../pages/user/Home';
import Events from '../pages/user/Events';
import UserEventDetails from '../pages/user/EventDetails';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import RoleSelection from '../pages/auth/RoleSelection';

import Dashboard from '../pages/organizer/Dashboard';
import OrganizerEvents from '../pages/organizer/Events';
import OrganizerEventDetails from '../pages/organizer/EventDetails';
import CreateEvent from '../pages/organizer/CreateEvent';
import EditEvent from '../pages/organizer/EditEvent';

import ProtectedRoute from './ProtectedRoute';
import OrganizerRoute from './OrganizerRoute';

const NotFound = () => (
  <div className="mx-auto max-w-md px-6 py-24 text-center">
    <p className="font-display text-3xl text-ink">Page not found</p>
    <p className="mt-2 text-sm text-ink/55">The page you're looking for doesn't exist.</p>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register/role" element={<RoleSelection />} />
      <Route path="/register" element={<Register />} />

      {/* Any logged-in user */}
      <Route element={<ProtectedRoute />}>
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<UserEventDetails />} />
      </Route>

      {/* Organizer-only */}
      <Route element={<OrganizerRoute />}>
        <Route path="/organizer/dashboard" element={<Dashboard />} />
        <Route path="/organizer/events" element={<OrganizerEvents />} />
        <Route path="/organizer/events/new" element={<CreateEvent />} />
        <Route path="/organizer/events/:id" element={<OrganizerEventDetails />} />
        <Route path="/organizer/events/:id/edit" element={<EditEvent />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
