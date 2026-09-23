---
title: Dear Stranger
slug: dear-stranger
category: products
year: "2024"
status: live
featured: false
published: true
technologies: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Stripe"]
summary: Full-stack anonymous letter exchange — React/TypeScript frontend, FastAPI + PostgreSQL backend, Stripe subscriptions. Moderation and privacy were harder than matching.
order: 6
---

## What it is

A web app for writing and receiving anonymous letters. Slow by design. I built it end to end: product, API, payments, moderation.

```
React / TypeScript
        │  REST
        ▼
   FastAPI (Python)
        │
   ┌────┴────┐
   ▼         ▼
PostgreSQL  Stripe
            (subs + webhooks)
```

Auth uses JWT. Matching, letter delivery timing, and notifications run through the API and background work rather than living in the client.

## Why this stack

- **React + TypeScript** for a maintainable web UI (this is not a mobile app).
- **FastAPI + PostgreSQL** for a clear REST surface and relational modelling of users, letters, matches, and entitlements.
- **Stripe subscriptions + webhooks** so billing state is driven by Stripe events, not optimistic client flags.

## Hard problems

**Anonymity vs abuse.** You want distance; attackers want free spam. Rate limits, automated moderation, and a review queue for edge cases mattered more than the matching algorithm.

**Subscriptions.** Webhook ordering and retries are the real billing work. Treat Stripe as source of truth; reconcile locally.

**Delayed delivery.** Letters are not chat. Scheduling and notification timing are product constraints that show up as jobs and state machines, not UI tricks.

## Tradeoffs

Firebase would have been faster to prototype. I chose a stack I can reason about for auth, data, and money — accepting more upfront backend work.
