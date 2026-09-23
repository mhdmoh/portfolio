---
title: HR Support & Ticket Automation
slug: hr-support-automation
category: enterprise
year: "2025"
status: live
featured: false
published: true
technologies: ["Python", "LLMs", "ServiceNow", "SAP", "RAG"]
summary: Classifies HR support emails, gathers context from SAP and documents, creates ServiceNow tickets, and drafts replies that the HR team reviews before sending.
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

## Why it works this way

A fully automatic system would create wrong tickets and send wrong emails. Doing everything by hand doesn't scale. I kept each stage separate so a wrong classification can be caught before it turns into a ticket.

The goal was faster triage and correct tickets, not fully automatic resolution. A person always reviews and sends the reply.

## Hard parts

Some emails mix several requests, like benefits and payroll in the same thread. Attachments without readable text left retrieval with nothing to work with, so the draft reply now says what information is missing instead of letting the model guess.

## Lesson

Most of the value came from connecting the steps to ServiceNow and SAP, not from the prompts.
