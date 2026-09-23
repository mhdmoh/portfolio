---
title: Dear Stranger
slug: dear-stranger
category: products
year: "2024"
status: live
featured: false
published: true
technologies: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Stripe"]
summary: A full-stack app for exchanging anonymous letters, built with React/TypeScript, FastAPI, PostgreSQL, and Stripe subscriptions. Moderation and privacy were harder than matching.
order: 6
---

## What it is

A web app for writing and receiving anonymous letters. Letters arrive with a delay on purpose, so it feels closer to real mail than to chat. I built all of it: the product, the API, payments, and moderation.

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

Auth uses JWT. Matching, delivery timing, and notifications run on the server as API calls and background jobs, not in the browser.

## Why this stack

- **React + TypeScript** for a web UI that's easy to maintain.
- **FastAPI + PostgreSQL** for a clear REST API and a relational model of users, letters, matches, and subscriptions.
- **Stripe subscriptions and webhooks**, so billing status comes from Stripe events rather than from the client.

## Hard problems

**Anonymity and abuse.** Anonymity makes spam and abuse easy. Rate limits, automated moderation, and a review queue for unclear cases mattered more than the matching algorithm.

**Subscriptions.** Most of the billing work was handling webhooks that arrive out of order or get retried. Stripe is the source of truth, and the local database syncs from it.

**Delayed delivery.** Because letters are delivered later, scheduling and notifications are handled by background jobs and state machines on the server.

## Tradeoffs

Firebase would have been faster for a prototype. I chose a stack where I fully control auth, data, and payments, even though it meant more backend work up front.
