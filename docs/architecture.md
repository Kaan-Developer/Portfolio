# Architecture

## Current application boundaries

- `src/components`: reusable presentational components.
- `src/pages`: public routes and page composition.
- `src/store`: existing Zustand state, including the chatbot message store. Do not move chatbot history into Supabase.
- `src/features/ai`: client API code for the existing chatbot.
- `api`: private server endpoints. AI provider secrets remain here, never in `src`.
- `src/features/contact`: reserved for the contact form feature.
- `src/features/admin`: reserved for the admin authentication and dashboard feature.
- `supabase/migrations`: versioned database schema and Row Level Security changes.

## Planned data flow

```text
Chatbot -> Zustand -> current browser session
Contact form -> server endpoint -> Supabase contact_messages -> admin inbox
/admin command -> login modal -> Supabase Auth -> admin route
```

## Future contact workflow

The contact form submits to a server endpoint, not directly from the browser to a privileged database client. The endpoint validates input, writes a `contact_messages` row through a protected Supabase server credential, and sends an email notification. The admin inbox is the source of truth; email is only a notification. Replies can initially be sent with the administrator's normal email client. A later phase can add replies inside the admin panel through an email provider.

## Future admin workflow

Typing `/admin` in the chatbot opens a login modal only. It does not grant access. Supabase Auth validates the email and password, then an `admin` database role is checked before the dashboard route is available. Admin access will be protected both in the client route and with Supabase Row Level Security.
