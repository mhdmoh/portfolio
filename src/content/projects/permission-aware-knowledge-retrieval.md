---
title: Permission-Aware Knowledge Retrieval
slug: permission-aware-knowledge-retrieval
category: enterprise
year: "2025"
status: live
featured: true
published: true
technologies: ["Python", "LangChain", "RAG", "FAISS", "ServiceNow"]
summary: Q&A over a company's ServiceNow knowledge articles. Each user only gets answers from articles their access level allows, and every answer cites its sources.
order: 2
facts:
  - label: Role
    value: Solo, designed and built end to end
  - label: Timeline
    value: About 1 month
  - label: Users
    value: Client employees, with roles and access levels set by each client
  - label: Status
    value: In production
---

## Why it exists

Finding the right ServiceNow knowledge article was slow. People searched manually or asked a colleague who remembered where it was. I built a Q&A system over the knowledge base so users can ask a question in plain language and get an answer with links to the articles it came from.

The main requirement was security. Knowledge bases mix general articles with restricted ones, and the system must **never answer from an article the user isn't allowed to read**.

## How access control works

An admin creates the user accounts and gives each user an access level. Every article has a clearance level. When a user asks a question, only articles at or below their level are used to answer it.

Each client sets up its own roles and levels, so the same system works for different organizations without code changes.

```flow
Question: with the user's access level
Search articles: FAISS
Access filter: cleared articles only
Generate answer
Answer + citations
```

## Key decisions

- **Check access before generating.** Restricted articles never reach the model. Filtering the answer afterwards would be too late, because the model would already have read the restricted text.
- **Always cite.** Every answer links to the articles it used, so users can check the source.
- **Keep it simple.** Users ask one question at a time and don't need chat history, so I built a single-step RAG pipeline instead of a conversational agent. It's easier to test and has fewer ways to go wrong.

## Stack

Articles are embedded with an all-MiniLM sentence-embedding model and stored in a FAISS index. LangChain handles retrieval and generation.

## Lessons

Users trust answers they can verify with one click. For internal knowledge, access control has to be part of retrieval from the start, not added later.
