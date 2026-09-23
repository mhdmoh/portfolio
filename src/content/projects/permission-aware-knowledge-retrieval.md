---
title: Permission-Aware Knowledge Retrieval
slug: permission-aware-knowledge-retrieval
category: enterprise
year: "2025"
status: live
featured: true
published: true
technologies: ["Python", "RAG", "ServiceNow", "Vector Search"]
summary: Answers over ServiceNow knowledge — filtered by what the user may see, with citations back to source articles.
order: 2
---

## Why it exists

People were hunting ServiceNow articles or asking colleagues who “knew where the page was.” I worked on Q&A over that corpus. The hard requirement was not fluency — it was **never answering from an article the user cannot open**.

## Biggest challenge

Permission-aware retrieval. Filter-after-generate is already too late: restricted text has entered the context window. ACLs belong **on the retrieval path**.

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

## Decisions that mattered

- **Filter before generate.** Unauthorized bodies never reach the prompt.
- **Citations are mandatory.** If you cannot click the source, you cannot trust the sentence.
- **Refuse when empty.** No authorized, relevant hit → say so. Do not invent from model prior.
- **ServiceNow stays system of record.** No parallel wiki that drifts from ownership and ACLs.

## What failed early

- Broad top-k felt smart in demos and cited marginal articles in production. Tighter retrieval + clear refusals behaved better.
- Citations sometimes pointed at retrieved docs that did not actually support the answer span. Grounding the citation list took more care than the first prompt suggested.
- Eval sets built on an admin account lied. I needed queries **per persona**.

## Lessons

Trust comes from openable citations. Security inside retrieval beats a disclaimer. Retrieval quality usually beats a stronger model on a sloppy index.
