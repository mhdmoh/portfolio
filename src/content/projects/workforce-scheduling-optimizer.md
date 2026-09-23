---
title: Workforce Scheduling Optimizer
slug: workforce-scheduling-optimizer
category: enterprise
year: "2025"
status: in-progress
featured: true
published: true
technologies: ["Python", "Simulated Annealing", "Excel"]
summary: A Simulated Annealing scheduler for support shifts and breaks. It cuts planning from up to 3 hours by hand to about 50 seconds per schedule and outputs a ready-to-use Excel file.
order: 1
facts:
  - label: Role
    value: Solo, designed and built end to end
  - label: Timeline
    value: About 1 month
  - label: Users
    value: Internal planning team scheduling support staff for several client companies
  - label: Status
    value: Final testing before production
---

## What I built

I built a scheduler for an internal planning team that staffs customer support for several client companies. It plans shifts, short breaks, and long breaks, and it runs every time the shifts change.

Before this, the planner built each schedule by trial and error, trying to get the backlog as low as possible. A single schedule could take **up to 3 hours**, and there was no way to know whether a better one existed. The optimizer produces a schedule in about **50 seconds** and outputs a formatted Excel file they can use directly.

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

```flow
Config + roster
Initial schedule
Simulated Annealing: neighbour moves ↔ cost
Best schedule
Formatted Excel
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

- Manual planning: **up to 3 hours** per schedule, by trial and error
- Optimizer: **~50 seconds** per schedule, with the same result for the same inputs
- Runs at **every shift change**, so faster planning adds up quickly
- Output: an Excel file that needs **no manual formatting**

Unlike manual trial and error, the optimizer searches the options systematically for the lowest-cost schedule. It isn't guaranteed to find the best possible one, but it's fast enough to re-run whenever something changes. It's now in final testing before going into production.
