---
title: HR Support & Ticket Automation
slug: hr-support-automation
category: enterprise
year: "2025"
status: live
featured: false
published: true
technologies: ["Python", "LLMs", "ServiceNow", "SAP", "RAG"]
summary: Classify HR email, pull SAP/doc context, open ServiceNow tickets, draft replies — humans still hit send.
order: 4
---

## Flow

```
email
  │
  ▼
classify intent
  │
  ▼
retrieve (docs / SAP / attachments)
  │
  ▼
ServiceNow ticket
  │
  ▼
draft reply
  │
  ▼
human review → send
```

## Why this shape

Full autonomy creates wrong tickets and wrong emails. Full manual triage does not scale. Stages stay separate so a bad classification does not silently invent a ticket.

**Decision:** optimize for triage speed and ticket correctness, not autonomous resolution. Outbound stays human.

## Hard parts

Overlapping intents (benefits + payroll in one thread). Attachments without text starved retrieval — “missing context” had to show up in the draft instead of letting the model fill gaps.

## Lesson

Enterprise value is often orchestration into systems of record, not the prompt.
