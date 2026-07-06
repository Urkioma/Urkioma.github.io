---
title: "Cluster Proxmox VE & Ceph"
order: 1
description: "Architecture, déploiement et pilotage du Proof of Concept (POC) visant à migrer l'infrastructure virtuelle VMware ESXi vers un cluster hyperconvergé open-source résilient de 3 nœuds."
shortDescription: "Migration d'infrastructure critique VMware ESXi vers Proxmox VE & Ceph"
preview: { type: "image", url: "/projects/proxmox-ceph-infra.png" }
color: "mint"
tech:
  [
    { name: "Proxmox VE", color: "lavender" },
    { name: "Ceph Storage", color: "mint" },
    { name: "VMware ESXi", color: "peach" },
  ]
githubUrl: "https://github.com/jeremy-stephan/proxmox-migration-poc"
featured: true
---

## Le Projet

Dans le cadre d'une stratégie de gestion des risques liée à l'évolution des licences VMware (suite au rachat par Broadcom), ce projet consiste à concevoir et déployer une infrastructure alternative complète. L'objectif était de valider la faisabilité technique d'une migration totale d'un parc critique de 285 machines virtuelles vers une solution open-source de niveau entreprise, sans compromis sur la haute disponibilité.

## Architecture & Technologies

### Hyperconvergence (Proxmox VE)

- **Cluster de 3 nœuds physiques** configuré pour la résilience.
- **Haute Disponibilité (HA)** native avec gestion fine du quorum.
- **Cluster Resource Scheduler (CRS)** pour la répartition intelligente des ressources au démarrage et lors des basculements.
- **Mécanisme de Fencing (STONITH)** matériel via cartes de management (iLO/iDRAC) pour éviter le split-brain.

### Stockage Distribué (Ceph)

- **Stockage partagé hyperconvergé** éliminant le besoin d'une baie de stockage (SAN) dédiée.
- **Pools de réplication** configurés pour tolérer la perte simultanée d'un nœud et de plusieurs disques.
- **Réseau de réplication dédié** isolé physiquement sur des liaisons 10 Gbps à faible latence.

### Stratégie de Migration

- **Proof of Concept (POC)** avec conversion et importation de machines virtuelles de production (fichiers `.vmdk` vers les volumes Ceph).
- **Interopérabilité réseau** : Alignement des bridges Proxmox avec la matrice de VLANs Cisco existante.
- **Optimisation des performances** : Configuration des agents invités (*QEMU Guest Agent*) pour assurer des sauvegardes à chaud cohérentes.

### Métriques & Validation

- **Stress-tests de charge** CPU/RAM et coupures physiques de nœuds pour valider la bascule automatique (HA).
- **Benchmarks I/O** du stockage Ceph en lecture/écriture séquentielle et aléatoire.
- **Modélisation du Plan de Reprise d'Activité (PRA)** avec calcul des métriques de temps de basculement.

## Fonctionnalités Clés

### Haute Disponibilité & Résilience

- Reprise automatique des VM en moins de 2 minutes en cas de crash d'un serveur physique.
- Migration à chaud (*Live Migration*) des VM d'un nœud à un autre sans aucune coupure réseau ou de service pour la maintenance des hôtes.

### Stockage Unifié & Évolutif

- Agrégation de la capacité de stockage de tous les serveurs en un seul pool logique.
- Ajout ou remplacement de disques à chaud sans interruption de l'infrastructure.

### Tableau de Bord & Supervision

- Centralisation des métriques du cluster et du stockage Ceph sur l'interface graphique de Proxmox.
- Alerting configuré pour notifier l'équipe d'administration en cas de dégradation de l'état d'un disque ou d'un nœud.