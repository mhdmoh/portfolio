---
title: Social Attraction PSO
slug: research-and-optimization
category: research
year: "2026"
status: live
featured: false
published: true
technologies: ["Python", "PSO", "Swarm Intelligence", "Robotics"]
summary: A PSO variant with Lévy flights, social attraction, and dispersal, tested up to 500 dimensions and on inverse kinematics for a 4+1 DoF arm. Published at ICCCI 2026 (Springer).
order: 5
---

## In short

With co-authors at ELTE I worked on **Social Attraction PSO**, which adds Lévy flights, a social attraction velocity update, a boost for weaker particles, and periodic dispersal to standard PSO. We compared it with PSO, ICSO, and Firefly on the Sphere, Ackley, Griewank, Rastrigin, and Rosenbrock functions at **10, 50, and 500** dimensions, and ran a grid search over particle count and iterations. We also applied it to inverse kinematics for a **4+1 DoF** robotic arm.

Paper: [ICCCI 2026 · Springer CCIS 3044](https://link.springer.com/chapter/10.1007/978-3-032-37936-8_1)

## What surprised us

The strong benchmark results didn't fully carry over to inverse kinematics. Joint limits changed which runs performed well, which kept us honest about the robotics results.

## Open question

We don't yet know how much of the improvement comes from each part (Lévy flights, dispersal, or social attraction). An ablation study is still on my list.
