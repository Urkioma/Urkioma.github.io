---
title: "POC Migration Infra : Rationalisation des Coûts Veeam via Cluster Kubernetes HA & CI/CD (Air-Gap)"
order: 5
description: "Étude de faisabilité et déploiement d'un POC Kubernetes (K3s HA) visant à migrer ~30 VM Web/BDD pour optimiser les coûts de licences de sauvegarde Veeam, couplé à une chaîne CI/CD Gitea & Nexus en réseau restreint."
shortDescription: "POC de consolidation de 30 VM applicatives vers Kubernetes HA pour réduire les coûts de licensing Veeam"
preview:
  type: "image"
  url: "/projects/kubernetes.jpg"
color: "peach"
tech:
  - name: "Kubernetes (K3s)"
    color: "peach"
  - name: "Docker & Nexus"
    color: "lavender"
  - name: "Gitea & CI/CD"
    color: "rose"
githubUrl: "https://github.com/urkioma"
featured: true
---

## Le Projet & Enjeux Financiers

Au sein d'un environnement d'infrastructure sécurisé, ce projet est né d'une problématique de **rationalisation des coûts d'exploitation et de licensing**. L'infrastructure existante s'appuyait sur une trentaine de machines virtuelles dédiées hébergeant des serveurs web et des bases de données, générant un coût de licensing **Veeam Backup & Replication** important (facturation par VM).

L'objectif de ce **Proof of Concept (POC)** était de valider la faisabilité technique, les performances et la résilience de la migration de l'intégralité de ce parc applicatif (~30 VM) vers une **architecture conteneurisée et mutualisée sur Kubernetes**. 

En consolidant ces workloads sur un cluster K3s Haute Disponibilité (HA), le projet visait à :
1. **Réduire drastiquement les coûts de licences Veeam** en diminuant le nombre de VM d'infrastructure à sauvegarder.
2. Moderniser la chaîne de déploiement via un pipeline CI/CD automatisé et 100 % autonome.

## L'Architecture & Le Workflow CI/CD

Pour valider le POC, une infrastructure cible complète a été déployée en intranet strict, intégrant le stockage des données applicatives et l'automatisation des livraisons.

### Étape 1 : Socle Cluster Haute Disponibilité (HA), Ingress & Rancher
Déploiement d'un cluster K3s multi-maîtres à 3 nœuds en mode `--cluster-init` (Embedded etcd) pour éliminer tout point unique de défaillance. Intégration de **MetalLB** pour l'attribution des IP de Load Balancing L2 et de **Traefik Ingress Controller** pour le routage des flux web mutualisés. Déploiement de **Rancher** sur le cluster pour offrir une interface web centralisée de gestion, de métriques et d'administration des ressources.

### Étape 2 : Stockage Distribué & Persistance BDD (Longhorn)
Validation de l'hébergement des bases de données (PostgreSQL/MySQL) via **Longhorn**. Agrégation du stockage bloc distribué sur les nœuds pour garantir la réplication synchrone des données BDD. Configuration fine du *failover* pour permettre la réinstanciation automatique des pods de BDD sans perte de données en cas de crash d'un nœud.

### Étape 3 : Repository d'Images Privé (Nexus)
Installation de **Sonatype Nexus3** servant de registre Docker interne pour stocker les images des serveurs web et BDD. Prise en compte des contraintes de proxy intranet et injection des jetons d'accès sur les nœuds K3s.

### Étape 4 : Pipeline CI/CD (Gitea & Act Runner)
Instanciation d'un serveur **Gitea** autonome et de son runner conteneurisé (`act_runner`). À chaque mise à jour du code applicatif, le pipeline exécute automatiquement :
1. Build automatisé de la nouvelle image de l'application web ou de la BDD.
2. Tagging dynamique basé sur le SHA du commit Git (`:gitea.sha`) pour garantir la traçabilité.
3. Push de l'image sécurisée dans le registre privé Nexus.
4. Déclenchement du déploiement de la nouvelle image sous forme de Pods mis à jour dans le cluster K3s.

### Étape 5 : Déploiement Continu & Stratégie d'Éviction
Exécution des mises à jour à chaud des déploiements Kubernetes via `kubectl set image` et `kubectl rollout restart` sans aucune coupure de service. 
Intégration d'un nettoyage automatique du cache de build (`docker image prune`) pour éviter de saturer le disque et prévenir l'éviction des Pods.

## Résultats du POC & Engineering

- **Validation du Gain Économique (ROI)** : Démonstration de la possibilité de regrouper les charges de travail de ~30 VM applicatives sur un nombre restreint de nœuds Kubernetes HA, ouvrant la voie à une réduction significative des coûts de licences Veeam.
- **Exploitation en Environnement Restreint** : Maîtrise des flux sans accès Internet (import/export d'images via `ctr`, gestion des certificats auto-signés, redirection Traefik/NodePort).
- **Gouvernance & Supervision** : Pilotage du cluster via l'interface centralisée **Rancher** et déploiement de chartes Helm (`cert-manager`).

## Le Bilan

### Optimisation Budgétaire & ROI
La validation du POC démontre une réduction de l'empreinte infrastructure de 30 VM à seulement 4 nœuds (3 nœuds K3s + 1 dæmon Nexus). Cette consolidation permet de libérer **26 licences Veeam Foundation**, représentant un gain financier direct d'environ **10 000 € HT sur 5 ans** (ou la capacité de couvrir 26 nouveaux serveurs sans surcoût de licence).

### Résilience & Haute Disponibilité
Passage d'architectures VM parfois isolées à un cluster tolérant aux pannes matérielles. La panne d'un hyperviseur n'entraîne plus l'interruption des bases de données ou des sites web grâce à la réplication Longhorn et à la réallocation automatique des pods.

### Modernisation Opérationnelle
En plus du gain financier, l'infrastructure gagne en agilité : les mises à jour applicatives sont désormais automatisées par CI/CD en quelques secondes, sans intervention manuelle sur les serveurs web.

### Limites & Points de Vigilance (Retours d'Expérience)

* **Impact Organisationnel & Humain :** 
  Si la faisabilité technique et le gain financier (ROI) sont validés à 100 %, la principale barrière à la généralisation en production réside dans la **conduite du changement**. La transition d'un modèle d'administration système classique vers un modèle DevOps/Kubernetes nécessite une acculturation importante des équipes et un plan de formation adapté pour surmonter les réticences naturelles au changement.