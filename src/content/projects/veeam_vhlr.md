---
title: "Sauvegarde Resiliente : Veeam, VHLR & Bandes LTO"
order: 2
description: "Conception d'une infrastructure de sauvegarde hybride combinant un depot durci Linux (VHLR) pour l'immuabilite a chaud et un lecteur de bande pour l'archivage a froid deconnecte contre les ransomwares."
shortDescription: "Securisation globale du parc et PRA via Veeam, VHLR et stockage LTO"
preview: { type: "image", url: "/projects/vhlr.jpg" }
color: "rose"
tech:
  [
    { name: "Veeam Backup", color: "mint" },
    { name: "Linux", color: "lavender" },
    { name: "Stockage LTO", color: "mint" },
  ]
githubUrl: "https://github.com/urkioma"
featured: true
---

## Le Projet

Face à l'évolution des cybermenaces ciblant spécifiquement les sauvegardes d'entreprise, ce projet vise à sanctuariser l'infrastructure de secours. L'objectif était de déployer une stratégie de défense en profondeur en combinant la rapidité de restauration d'un dépôt local immuable et la sécurité absolue d'un support physique déconnecté du réseau, garantissant la survie des données même en cas de compromission totale du système d'information.

## Architecture & Technologies

### Immuabilité à Chaud (Veeam VHLR)

- **Veeam Hardened Linux Repository (VHLR)** : Déploiement d'un dépôt de sauvegarde physique indépendant sous Linux durci (Debian/RHEL).
- **Verrouillage des données** : Configuration des indicateurs d'immuabilité au niveau du système de fichiers (via chattr), interdisant toute modification ou suppression des points de restauration par un rançongiciel ou un administrateur corrompu.
- **Sécurisation du système (Hardening)** : Désactivation du protocole SSH après initialisation, utilisation exclusive de comptes locaux non nominatifs à usage unique (Single-Use Credentials) et restrictions réseau strictes.

### Archivage à Froid & Air-Gap (Lecteur de Bande)

- **Lecteur de bande magnétique LTO** : Intégration et configuration d'une solution de stockage sur bande pour les sauvegardes à long terme (Cold Backup).
- **Isolation physique (Air-Gap)** : Processus de rotation et d'exportation physique des bandes hors de la baie/du site, rendant les données mathématiquement intouchables par une cyberattaque réseau.
- **Politique GFS** : Configuration des plans de rétention Veeam pour automatiser l'archivage périodique (Hebdomadaire/Mensuel/Annuel) sur support bande.

### Validation & Plan de Reprise d'Activité (PRA)

- **Garantie de restauration** : Planification et exécution de tests semestriels de restauration complète de l'infrastructure pour valider l'intégrité des données stockées.
- **Calcul des métriques clés** : Mesure et optimisation du RTO (Recovery Time Objective) et du RPO (Recovery Point Objective) pour s'assurer de la conformité avec les exigences de continuité d'activité.

## Fonctionnalités Clés

### Protection Anti-Ransomware Absolue

- Double protection : protection logique à court terme via le noyau Linux du VHLR, et protection physique à long terme via l'isolation des bandes magnétiques.
- Résistance éprouvée aux attaques par mouvements latéraux grâce à la ségrégation des réseaux de sauvegarde.

### Maintien en Condition Opérationnelle (MCO)

- Supervision centralisée des jobs de sauvegarde quotidiens avec système d'alerte en cas d'échec ou de dégradation des fenêtres de sauvegarde.
- Processus documenté pour l'application des mises à jour de sécurité sur le serveur Veeam et le dépôt Linux sans rupture de la chaîne d'immuabilité.