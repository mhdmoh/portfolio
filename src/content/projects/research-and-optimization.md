---
title: Social Attraction PSO
slug: research-and-optimization
category: research
year: "2026"
status: live
featured: false
published: true
technologies: ["Python", "PSO", "Swarm Intelligence", "Robotics"]
summary: PSO variant with Lévy-flight, social attraction, and dispersal — benchmarks to 500D; IK on a 4+1 DoF arm. ICCCI 2026 / Springer.
order: 5
---

## In short

With collaborators at ELTE I worked on **Social Attraction PSO**: Lévy-flight, social attraction velocity updates, boosting weak particles, periodic dispersal. Compared against PSO, ICSO, and Firefly on Sphere / Ackley / Griewank / Rastrigin / Rosenbrock at **10 / 50 / 500** dimensions, plus a particle/iteration grid search. Also applied to **4+1 DoF** inverse kinematics.

Paper: [ICCCI 2026 · Springer CCIS 3044](https://link.springer.com/chapter/10.1007/978-3-032-37936-8_1)

## What surprised us

Synthetic wins did not transfer cleanly to IK. Joint limits changed which runs looked good — useful, because it stopped overselling the robotics section.

## Open

How much of the gain is Lévy-flight vs dispersal vs social attraction? Ablation is still on my list.
