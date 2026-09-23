---
title: Workforce Scheduling Optimizer
slug: workforce-scheduling-optimizer
category: enterprise
year: "2025"
status: live
featured: true
published: true
technologies: ["Python", "Simulated Annealing", "Excel"]
summary: Simulated Annealing for support staffing and breaks — ~3 hours of manual planning to ~50 seconds, with a ready Excel workbook.
order: 1
---

## What I built

A scheduler for customer-support operations: shifts, short breaks, long breaks. Planners were spending **3+ hours** of trial and error on a workable plan. The engine does the same job in about **50 seconds** and writes a formatted Excel file they can use as-is.

No LLM. Classical optimization against a configurable cost function.

## Why brute force was impossible

Even modest headcount makes shift × break combinations explode. You cannot enumerate; you search.

I needed a method that explores discrete neighbourhoods (move a break, swap a slot), escapes local optima, and respects a wall-clock budget planners would actually wait for. **Simulated Annealing** fit. Genetic algorithms were on the table; SA was easier to reason about and stop early.

## Cost function

Competing terms in one score:

- utilization
- backlog / SLA pressure
- understaffing per interval
- break distribution

Weights are configuration, not magic numbers in code. Different sites tune without a fork.

```
config + roster
      │
      ▼
initial schedule
      │
      ▼
Simulated Annealing
      │
  neighbour ←→ cost
      │
      ▼
best schedule
      │
      ▼
formatted Excel
```

## Tradeoffs

| Choice | Why | Cost |
| --- | --- | --- |
| SA over exact MIP | Runtime and operable neighbourhoods | Not a global optimum guarantee |
| Soft penalties over hard-only | Search stays movable | Weights need real historical days to tune |
| Excel as the product | Matches how planners already work | Report layout is part of the engineering |

## What surprised me

Early versions over-weighted utilization and looked “tight” while still blowing SLA on peaks. Neighbour generation mattered as much as the anneal schedule: too small and it crawled; too wild and most candidates were garbage.

## Impact

- Manual baseline: **3+ hours**, experience-dependent
- Optimizer: **~50 seconds**, repeatable on the same inputs
- Deliverable: workbook with **no manual formatting** afterward

I am not claiming global optimality. I am claiming a schedule that met their acceptance bar, fast enough to re-run.
