---
title: Workforce Scheduling Optimizer
slug: workforce-scheduling-optimizer
category: enterprise
year: "2025"
status: live
featured: true
published: true
technologies: ["Python", "Simulated Annealing", "Excel"]
summary: A Simulated Annealing scheduler for support shifts and breaks. Planning went from about 3 hours by hand to about 50 seconds, with a ready-to-use Excel file.
order: 1
---

## What I built

A scheduler for customer support teams that plans shifts, short breaks, and long breaks. Planners used to spend **3+ hours** on trial and error to get a workable plan. The optimizer does it in about **50 seconds** and outputs a formatted Excel file they can use directly.

There's no LLM involved. It's classical optimization against a configurable cost function.

## Why brute force doesn't work

Even with a small team, the number of possible shift and break combinations is huge, so checking every option isn't possible. The schedule has to be found by search.

I needed a method that makes small changes (move a break, swap a slot), can escape local optima, and finishes in a time planners are willing to wait. **Simulated Annealing** fit well. I also considered genetic algorithms, but SA was easier to reason about and to stop early.

## Cost function

The score balances several competing goals:

- utilization
- backlog / SLA pressure
- understaffing per interval
- break distribution

The weights live in a config file, so each site can tune them without changing the code.

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
| SA instead of exact MIP | Fast, and easy to define moves | No guarantee of the global optimum |
| Soft penalties, not only hard constraints | The search doesn't get stuck | Weights need tuning on real historical days |
| Excel as the output | Planners already work in Excel | The report layout became part of the work |

## What surprised me

Early versions gave too much weight to utilization. The schedules looked efficient but still missed SLAs during peak hours. How I generated neighbouring schedules mattered as much as the cooling schedule: changes that were too small made the search slow, and changes that were too large produced mostly bad candidates.

## Impact

- Manual planning: **3+ hours**, depending on the planner's experience
- Optimizer: **~50 seconds**, with the same result for the same inputs
- Output: an Excel file that needs **no manual formatting**

The schedule isn't guaranteed to be the best possible one, but it meets the team's requirements and is fast enough to re-run whenever something changes.
