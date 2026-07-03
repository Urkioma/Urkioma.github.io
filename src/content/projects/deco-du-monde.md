---
title: "Deco du Monde"
order: 1
description: "Application panel admin de gestion complète pour studio photo. Solution fullstack moderne combinant AdonisJS 6, Vue 3 et Inertia pour une expérience utilisateur fluide et réactive."
shortDescription: "Gestion de studio photo avec AdonisJS 6, Vue 3 et Inertia"
preview: { type: "video", url: "/projects/deco-du-monde.mov" }
color: "mint"
tech:
  [
    { name: "Vue.js", color: "mint" },
    { name: "AdonisJS", color: "lavender" },
    { name: "InertiaJS", color: "rose" },
  ]
githubUrl: "https://github.com/MGouillardon/deco-du-monde"
featured: true
---

## Le Projet

Application web fullstack moderne dédiée à la gestion d'un studio photo spécialisé en décoration d'intérieur. Le projet met l'accent sur l'efficacité opérationnelle et la qualité du code, avec une architecture robuste et une expérience utilisateur soignée.

## Architecture & Technologies

### Backend (AdonisJS 6)

- **Architecture MVC** avec controllers structurés
- **ORM Lucid** pour une gestion efficace des données
- **Système de policies** pour la gestion fine des autorisations
- **Services dédiés** pour la logique métier
- **Validation** avec VineJS
- **Système d'events** pour la communication interne

### Frontend (Vue 3 + Inertia)

- **Composition API** pour une meilleure réutilisation du code
- **Inertia.js** pour faire le lien entre backend et frontend
- **DaisyUI** pour des composants UI cohérents
- **TailwindCSS** pour le styling flexible
- **Composables** pour la logique réutilisable

### Base de Données

- **MySQL** avec relations optimisées
- **Migrations** pour un versioning de la DB
- **Seeds** pour les données de test
- **Factory Pattern** pour les tests

### Qualité & Tests

- **Tests unitaires & fonctionel** avec Japa
- **Tests E2E** avec Playwright
- **CI** via GitHub Actions
- **ESLint & Prettier** pour la qualité du code

## Fonctionnalités Clés

### Gestion des Ressources

- Inventaire détaillé et tracking des éléments
- Système de validation multi-étapes
- Gestion des sets de décoration
- Suivi en temps réel du matériel

### Planning

- **Calendrier interactif** avec FullCalendar
- Gestion des événements avec drag & drop
- Assignation automatique des équipes
- Validation des étapes par role

### Tableau de Bord

- Métriques clés en temps réel
- Gestion des utilisateurs et roles
- Widgets personnalisables
- Vue d'ensemble des activités

### Sécurité & Performance

- **Authentication** complète
- **Authorization** basée sur les roles
- **Validation** côté serveur
