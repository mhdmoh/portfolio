---
title: Permission-Aware Knowledge Retrieval
slug: permission-aware-knowledge-retrieval
category: enterprise
year: "2025"
status: live
featured: true
published: true
technologies: ["Python", "LangChain", "RAG", "ServiceNow", "Vector Search"]
summary: Q&A over ServiceNow knowledge articles. Answers only use articles the user is allowed to open, and every answer cites its sources.
order: 2
---

## Why it exists

Finding the right ServiceNow article was slow. People searched manually or asked a colleague who remembered where it was. I worked on a Q&A system over that knowledge base. The main requirement was security: the system must **never answer from an article the user cannot open**.

## Biggest challenge

Permissions. Filtering the answer after generation is too late, because the restricted text has already been sent to the model. So the permission check has to happen **during retrieval**, before anything reaches the prompt.

```
question
   │
   ▼
identity & permissions
   │
   ▼
ServiceNow KB
   │
   ▼
permission filter
   │
   ▼
ranked articles
   │
   ▼
grounded generation
   │
   ▼
answer + citations
```

## Key decisions

- **Filter before generating.** Articles the user can't access are never added to the prompt.
- **Always cite.** Every answer links to the articles it used, so users can check the source.
- **Say "I don't know" when there's nothing.** If no relevant article is accessible, the system says so instead of guessing.
- **Keep ServiceNow as the source of truth.** No separate copy of the content that could drift from the original permissions.

## What went wrong early

- Retrieving many articles (a large top-k) looked good in testing, but in real use it cited loosely related articles. Retrieving fewer articles and refusing more often worked better.
- Some citations pointed to retrieved articles that didn't actually support the answer. Getting citations right took more work than expected.
- My first evaluation set was built with an admin account, which can see everything, so the results were misleading. I had to build test queries for each type of user.

## Lessons

Users trust answers they can verify with a click. Permissions need to be enforced in retrieval, not added as a disclaimer. Improving retrieval usually helped more than switching to a stronger model.
