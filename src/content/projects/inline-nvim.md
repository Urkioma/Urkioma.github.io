---
title: "Plugin Neovim"
order: 3
description: "Plugin Neovim pour permettre l'évaluation en temps réel de code JavaScript/TypeScript, offrant un retour visuel instantané directement dans l'éditeur."
shortDescription: "Évaluation temps réel de JS/TS dans Neovim"
preview: { type: "video", url: "/projects/inline-nvim.mov" }
color: "lavender"
tech:
  [
    { name: "Lua", color: "lavender" },
    { name: "Neovim", color: "mint" },
    { name: "JavaScript", color: "rose" },
  ]
githubUrl: "https://github.com/MGouillardon/inline-eval.nvim"
featured: true
---

## Le Projet

Plugin Neovim développé en Lua qui améliore l'expérience de développement JavaScript/TypeScript en permettant l'évaluation en temps réel du code. Le plugin affiche les résultats des `console.log` directement à côté du code source, créant ainsi un environnement de développement plus intuitif et productif.

## Architecture & Technologies

### Core (Lua)

- **Architecture modulaire** avec séparation claire des responsabilités
- **Gestion d'état** via un système de state management personnalisé
- **API Neovim** utilisée pour les interactions avec l'éditeur
- **System jobs** pour l'exécution asynchrone du code
- **Événements** pour une réactivité optimale

### Interface Utilisateur

- **Fenêtre flottante** pour l'affichage des résultats
- **Mise en forme syntaxique** avec TreeSitter
- **Actualisation en temps réel** avec debouncing intelligent
- **Gestion contextuelle** de l'affichage
- **Design minimaliste**

### Performance

- **Debouncing** pour éviter les évaluations inutiles
- **Gestion optimisée** des ressources système
- **Nettoyage automatique** des fichiers temporaires
- **Évaluation intelligente** uniquement en cas de changements

## Fonctionnalités Clés

### Évaluation en Temps Réel

- Exécution automatique du code JS/TS
- Affichage instantané des résultats
- Support de plusieurs types de sortie
- Gestion intelligente des erreurs

### Configuration Flexible

- **Options personnalisables** pour l'intervalle de mise à jour
- **Filtres de type de fichier** configurables
- **Paramètres d'affichage** ajustables
- **Integration** avec d'autres plugins Neovim

### Intégration Node.js

- **Exécution native** du code JavaScript/TypeScript
- **Gestion des dépendances** transparente
- **Support des modules** ES6/CommonJS
- **Environnement d'exécution** isolé

### Developer Experience

- **Commands intuitives** pour le contrôle
- **Feedback visuel** immédiat
- **Messages d'erreur** clairs et utiles
- **Documentation** complète et exemples
