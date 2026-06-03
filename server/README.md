# Portfolio Admin Backend

This backend is a production-grade Express API layer for the React + Vite portfolio admin dashboard.

## Structure

- `src/config` — database, cloudinary, environment config
- `src/controllers` — route handlers for auth, projects, media, analytics, settings
- `src/middleware` — authentication, authorization, security, uploads, error handling
- `src/models` — MongoDB schemas for users, projects, media, analytics, themes, activity
- `src/routes` — API route definitions
- `src/services` — Cloudinary upload helpers and analytics utilities
- `src/utils` — token generation, async wrappers, API errors

## Setup

1. Copy the `.env` file and provide your secrets.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

## API

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`
- `GET /api/auth/me`
- `GET /api/projects`
- `GET /api/projects/:slug`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`
- `POST /api/media/upload`
- `DELETE /api/media/:id`
- `POST /api/analytics/track`
- `GET /api/analytics/dashboard`
- `GET /api/settings`
- `PUT /api/settings`

## Notes

- Admin routes are protected by JWT auth and admin role middleware.
- Cloudinary uploads use memory storage and stream-based upload for file assets.
- Analytics events are stored in MongoDB with browser, device, and session details.
