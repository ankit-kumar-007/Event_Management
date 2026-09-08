# Event Management & Tickets Booking (MERN)

Full stack is built: Express/MongoDB backend + React (Vite + Tailwind) frontend.

## Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # then edit .env with real values
npm run dev             # starts on http://localhost:5000
```

Requires a running MongoDB instance (local or Atlas) — set `MONGO_URI` in `.env`.

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env   # VITE_API_URL should point at the backend, e.g. http://localhost:5000/api
npm run dev             # starts on http://localhost:5173
```

Run both at once (two terminals) for the full app. The Vite dev server proxies nothing special — the client just calls `VITE_API_URL` directly via axios, so make sure the backend's `CLIENT_URL` in `server/.env` matches wherever the client actually runs (CORS).

## Frontend structure

- **Design**: ticket-stub motif (perforated card divider) for event cards and the booking panel; Fraunces for headlines/titles, Inter for UI, IBM Plex Mono for date/time/venue meta; each category (tech, cultural, sports, workshop, music, business) has its own accent color used consistently across chips, filters, and cards.
- **Auth flow**: `/register/role` → pick organizer or attendee → `/register` (role pre-filled, still editable via "Change") → `/login`. JWT + user are stored together in `localStorage` under `emtb_auth`; `AuthContext` re-validates the token against `GET /api/auth/me` on app load.
- **Route guards**: `ProtectedRoute` (any logged-in user) and `OrganizerRoute` (must be role `organizer`) live in `routes/`, wrapping the relevant `<Route>` groups in `routes/AppRoutes.jsx`.
- **Data fetching**: `services/api.js` is a single axios instance that attaches `Authorization: Bearer <token>` to every request and clears storage on a 401. `useEvents.js` re-fetches whenever category/search/page change — used by both `pages/user/Home.jsx` (3 upcoming events) and `pages/user/Events.jsx` (full paginated browse).
- **Organizer flow**: Dashboard (stats + recent events) → Events (full table, edit/delete with confirm modal) → CreateEvent/EditEvent (shared `EventForm` component). Delete/edit are blocked server-side to the owning organizer even if someone guesses another organizer's event ID.

## Verifying without `npm install`

This was built in a sandboxed environment without network access, so `npm install` / a real Vite build couldn't be run here. Instead, every backend file was checked with `node --check`, and every frontend file was parsed with the TypeScript compiler's JSX parser (catches unclosed tags, mismatched braces, invalid syntax) plus a script confirming every relative import resolves to a real file. Both passed clean. What this can't catch: runtime/logic bugs, Tailwind class typos that don't map to a defined token, or dependency version mismatches — normal things to shake out on your first `npm run dev`.

## Auth model

- JWT is returned in the response body on register/login (`{ token, user }`).
- Client stores it in `localStorage` and sends it back on every protected request as:
  `Authorization: Bearer <token>`
- Roles: `organizer` and `user`, set at registration and enforced server-side via `restrictTo()`.

## API Reference

### Auth — `/api/auth`
| Method | Route      | Access  | Body |
|--------|-----------|---------|------|
| POST   | /register | Public  | `{ name, email, password, role? }` (role defaults to `user`) |
| POST   | /login    | Public  | `{ email, password }` |
| GET    | /me       | Private | — (reads token) |

### Events — `/api/events`
| Method | Route              | Access               | Notes |
|--------|--------------------|-----------------------|-------|
| GET    | /                  | Public                | Query: `category`, `search`, `page`, `limit` |
| GET    | /:id               | Public                | Single event details |
| GET    | /organizer/mine    | Private (organizer)   | Events created by the logged-in organizer |
| POST   | /                  | Private (organizer)   | Create event |
| PUT    | /:id               | Private (organizer)   | Only the owning organizer can edit |
| DELETE | /:id               | Private (organizer)   | Only the owning organizer can delete |

### Event fields
```json
{
  "title": "string",
  "description": "string",
  "category": "tech | cultural | sports | workshop | music | business | other",
  "date": "ISO date string",
  "time": "string, e.g. 18:30",
  "venue": "string",
  "image": "URL (optional)",
  "ticketInfo": "free text (optional)",
  "registrationLink": "Google Form URL"
}
```

`organizer` and `createdAt` are set automatically by the server (not sent by the client).

## Search & filter

- `GET /api/events?category=tech` — filter by category
- `GET /api/events?search=hackathon` — full-text search across title, description, venue
- Both can be combined and paginated: `?category=tech&search=ai&page=2&limit=10`

## Next steps

1. `npm install` inside `server/` and confirm `GET /api/health` responds.
2. Build the React client per the original folder structure, using `services/authService.js` and `services/eventService.js` to call these endpoints with axios/fetch, attaching the stored JWT as a Bearer header.
