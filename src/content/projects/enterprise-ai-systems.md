---
title: Recruitment Intelligence Platform
slug: enterprise-ai-systems
category: enterprise
year: "2025"
status: live
featured: true
published: true
technologies: ["Capability Matching", "Hybrid Scoring", "Explainable Ranking"]
summary: Rank candidates against one role or across many — semantic capability matching plus deterministic scoring, so recruiters can inspect the ranking instead of trusting an LLM.
order: 3
---

## Why I built it this way

Recruiters needed rankings they could explain in a calibration meeting. Keyword matching misses transferable skills when a résumé and a job description use different words for the same capability. Pure LLM scoring is hard to audit — it can look confident and still be inconsistent across runs.

I structured both jobs and résumés into capabilities first, then matched and scored. Semantic understanding stays in the picture; consistency comes from deterministic rules on top.

Upload one or more job descriptions and résumés. Rank against a single position, or cross-match candidates across multiple open roles.

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
rankings + hiring insights
```

## Structured extraction

Documents become structured capabilities before any ranking happens — not raw text blobs.

That includes normalized capability labels, weighted requirements, parent/child relationships, and synonym expansion. Matching runs on that graph so “React” and a related frontend skill can relate without pretending they are identical.

## Matching

Ranking combines semantic similarity, capability overlap, weighted requirements, and deterministic calibration.

LLMs provide understanding. Deterministic scoring provides consistency.

## Outputs

More than a single score:

- ranked candidates
- explainable fit summaries
- capability overlap
- missing core requirements
- skill gaps and comparison metrics
- recruiter-facing insights

## Tradeoffs

| Rejected | Chose | Why |
| --- | --- | --- |
| Pure keyword matching | Capability graph | Handles synonymous and related skills |
| Pure LLM scoring | Hybrid scoring | Rankings stay consistent and auditable |
| Flat skill lists | Structured capabilities | Preserves relationships and importance |
| Black-box recommendations | Explainable summaries | Recruiters can understand every ranking |

## What went wrong

Raw LLM extraction produced inconsistent structures. Validation had to run before anything entered the ranking pipeline.

Semantic similarity alone over-ranked buzzword overlap. Calibration rules became necessary after we watched real shortlists go wrong — especially on cross-job matching.
