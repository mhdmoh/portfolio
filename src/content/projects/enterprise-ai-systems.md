---
title: Recruitment Intelligence Platform
slug: enterprise-ai-systems
category: enterprise
year: "2025"
status: live
featured: true
published: true
technologies: ["Python", "FastAPI", "LangChain", "Chroma", "FAISS", "Ollama"]
summary: Ranks candidates against one role or across several, using semantic capability matching plus deterministic scoring so recruiters can see why each candidate ranked where they did.
order: 3
---

## Why I built it this way

Recruiters needed rankings they could explain to hiring managers. Keyword matching misses candidates whose résumé describes the same skill in different words. Scoring purely with an LLM is hard to audit, and the results can change between runs.

So I first convert both job descriptions and résumés into structured capabilities, then match and score them. The LLM handles understanding the text; deterministic rules keep the scores consistent.

Recruiters upload one or more job descriptions and résumés, then rank candidates for a single role or compare them across several open roles.

## Architecture

```
jobs + résumés
        │
        ▼
structured extraction
        │
        ▼
capability graph
(parent / child / synonyms)
        │
        ▼
semantic matching
        │
        ▼
hybrid scoring
LLM + deterministic rules
        │
        ▼
rankings + fit summaries
```

The backend is an async FastAPI service that handles résumé ingestion, job parsing, ranking, cross-job ranking, and automated interview emails. Embeddings are stored in Chroma or FAISS, and the LLM steps can run on local models through Ollama or LM Studio.

## Structured extraction

Before ranking, each document is turned into a list of capabilities with normalized names, weights, parent/child relationships, and synonyms. This lets related skills count toward a match (for example, React and a related frontend skill) without treating them as identical.

LLM output doesn't always come back in the expected format, so every extraction goes through JSON validation and repair before it enters the pipeline.

## Scoring

The final score combines semantic similarity, capability overlap, requirement weights, and deterministic calibration. Experience only counts when it's relevant to the role.

## Outputs

- ranked candidates
- a short fit summary for each candidate
- matched capabilities
- missing core requirements
- skill gaps and comparison metrics

## Tradeoffs

| Instead of | I chose | Why |
| --- | --- | --- |
| Keyword matching | Capability graph | Handles synonyms and related skills |
| LLM-only scoring | Hybrid scoring | Rankings stay consistent and auditable |
| Flat skill lists | Structured capabilities | Keeps relationships and importance |
| Unexplained scores | Fit summaries | Recruiters can see the reasoning |

## What went wrong

Raw LLM extraction returned inconsistent structures, so validation had to happen before ranking.

Semantic similarity on its own ranked candidates too high when they just repeated the right buzzwords. We added calibration rules after seeing bad shortlists in real use, especially when matching candidates across multiple roles.
