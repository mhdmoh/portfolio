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

## Problem

HR support emails need triage, context from enterprise systems, and a correct reply. Doing everything by hand doesn't scale. A fully automatic system would create wrong tickets and send wrong emails.

The goal is faster and more reliable triage and response preparation — not fully autonomous communication.

## System boundaries

```boundaries
AI
classification
retrieval
draft generation
---
Enterprise integrations
ServiceNow
SAP
documents / attachments
---
Human
review
edit
send
```

## Flow

```flow
Email
Classify intent
Retrieve context: docs / SAP / attachments
ServiceNow ticket
Draft reply
Human review → send
```

## Why it works this way

I kept each stage separate so a wrong classification can be caught before it turns into a ticket. A person always reviews and sends the reply — humans own the irreversible step of communicating with the employee.

## Hard parts

Some emails mix several requests, like benefits and payroll in the same thread. Attachments without readable text left retrieval with nothing to work with, so the draft reply now says what information is missing instead of letting the model guess.

## Outcome

- Faster triage through automatic classification and context retrieval
- More reliable tickets by gathering SAP and document context before ticket creation
- Draft replies prepared for human review rather than sent automatically
- Most of the value came from connecting the steps to ServiceNow and SAP, not from the prompts
