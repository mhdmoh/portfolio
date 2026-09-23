---
title: Recruitment Intelligence Platform
slug: enterprise-ai-systems
category: enterprise
year: "2025"
status: pilot
featured: true
published: true
technologies: ["Python", "FastAPI", "LangChain", "Chroma", "FAISS", "Ollama"]
summary: Ranks candidates against one role or across several, using semantic capability matching plus deterministic scoring so recruiters can see why each candidate ranked where they did. Runs entirely on local LLMs to keep candidate data private.
order: 3
facts:
  - label: Role
    value: Solo, designed and built end to end
  - label: Timeline
    value: About 4 months
  - label: Users
    value: Recruiters at TCS
  - label: Status
    value: Pilot
---

## Why I built it this way

Recruiters needed rankings they could explain to hiring managers. Keyword matching misses candidates whose résumé describes the same skill in different words. Scoring purely with an LLM is hard to audit, and the results can change between runs.

So I first convert both job descriptions and résumés into structured capabilities, then match and score them. The LLM handles understanding the text; deterministic rules keep the scores consistent.

Recruiters upload one or more job descriptions and résumés, then rank candidates for a single role or compare them across several open roles.

## Local models only

Résumés are personal data, and company policy doesn't allow sending them to online LLM services. So every LLM step runs on local models through Ollama or LM Studio, and candidate data never leaves the company's machines.

That ruled out the largest hosted models, which made the rest of the design matter more: structured extraction, validation, and deterministic scoring make up for what a smaller local model gets wrong.

## Architecture

```flow
Jobs + résumés
Structured extraction: JSON, validated
Capability graph: parent / child / synonyms
Semantic matching
Hybrid scoring: LLM + deterministic rules
Rankings + fit summaries
```

The backend is an async FastAPI service that handles résumé ingestion, job parsing, ranking, cross-job ranking, and automated interview emails. Embeddings are stored in Chroma or FAISS.

## Structured extraction

Before ranking, each résumé and job description is turned into structured JSON: normalized capability names, weights, and experience. Local models don't always return valid JSON, so every extraction goes through validation and repair before it enters the pipeline.

Extraction only keeps job-relevant fields. Gender, age, and photos aren't extracted, so they can't affect the ranking.

## Capability graph

For each run, the LLM builds a capability graph from that run's jobs and candidates, with parent/child relationships and synonyms. This lets related skills count toward a match (for example, React and a related frontend skill) without treating them as identical. Building the graph per run means it always covers the skills that actually appear in the documents, instead of relying on a fixed skills list that goes out of date.

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
| Hosted LLM APIs | Local models (Ollama, LM Studio) | Candidate privacy and company policy |
| Keyword matching | Capability graph | Handles synonyms and related skills |
| LLM-only scoring | Hybrid scoring | Rankings stay consistent and auditable |
| Unexplained scores | Fit summaries | Recruiters can see the reasoning |

## What went wrong

Raw LLM extraction returned inconsistent structures, so I added validation and repair before anything reaches the ranking step.

Semantic similarity on its own ranked candidates too high when they just repeated the right buzzwords. I added calibration rules after seeing bad shortlists in testing, especially when matching candidates across multiple roles.
