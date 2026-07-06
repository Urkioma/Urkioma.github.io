---
title: "Industrialisation & Deploiement de Masse : Ansible & Semaphore"
order: 3
description: "Automatisation complete du cycle de vie de 128 instances Windows de formation sur cluster Proxmox VE, orchestree via Ansible Semaphore et supervisee par Graylog."
shortDescription: "Orchestration et industrialisation de 128 instances de formation via Ansible et Semaphore"
preview: { type: "image", url: "/projects/ansible.png" }
color: "lavender"
tech:
  [
    { name: "Ansible", color: "lavender" },
    { name: "Proxmox VE", color: "mint" },
    { name: "Graylog / NXLog", color: "rose" },
  ]
githubUrl: "https://github.com/urkioma"
featured: true
---

## Le Projet

Pour répondre aux besoins de formation des greffiers sur les applications judiciaires, ce projet rationalise et industrialise la mise à disposition d'environnements éphémères. L'objectif était de concevoir une usine logicielle capable de déployer, configurer et détruire à la demande un parc de 128 machines virtuelles Windows (applications métiers) de manière totalement automatisée, tout en garantissant une traçabilité intégrale des activités.

## Architecture & Technologies

### Usine à Commutation Virtuelle & Automatisation (Ansible)

- **Cycle de vie automatisé** : Développement de playbooks Ansible permettant le provisionnement (clonage lié), la jonction au domaine Active Directory, la maintenance et le nettoyage complet des VM.
- **Répartition intelligente de charge** : Algorithme Ansible dynamique distribuant cycliquement les 128 instances sur les 3 nœuds physiques du cluster pour équilibrer les ressources CPU/RAM.
- **Haute Disponibilité à chaud** : Injection automatisée de directives d'activation de la Haute Disponibilité (HA) via l'API Proxmox à la création de chaque instance.

### Conception du Master & Provisionnement (Cloudbase-Init)

- **Gestion du Master (Sysprep)** : Création d'une image de référence Windows durcie utilisant Cloudbase-Init pour contourner les limitations de jetons Sysprep et automatiser l'exécution de scripts au démarrage du système.
- **Configuration dynamique** : Exploitation de Cloud-Init (`configdrive2`) pour injecter à la volée la configuration réseau (adresses IP statiques, masques, passerelles) et les identifiants d'administration locale de chaque VM.

### Centralisation des Logs & Observabilité (Graylog)

- **Collecte centralisée** : Intégration transparente d'un agent de journalisation léger (NXLog CE) au sein du playbook Ansible de déploiement pour assurer le suivi immédiat des actions utilisateurs.
- **Supervision & Traçabilité** : Acheminement en temps réel des logs d'événements Windows vers un serveur Graylog, permettant l'audit global des sessions et des applications utilisées par les apprenants.

### Interface d'Orchestration (Ansible Semaphore)

- **Simplification du processus** : Déploiement de l'application web Ansible Semaphore pour encapsuler la complexité technique des playbooks derrière une interface graphique épurée.
- **Autonomie opérationnelle** : Permet de déclencher en un clic les campagnes de déploiement ou de suppression globale des 128 machines virtuelles sans nécessiter d'accès en ligne de commande au serveur Ansible.

## Fonctionnalités Clés

### Robustesse & Performance de Masse

- Exécution parallélisée par vagues et gestion des goulots d'étranglement de l'API pour garantir un déploiement fluide de l'ensemble du parc sans saturer les volumes de stockage.
- Mécanismes de résilience intégrés avec retentatives automatiques en cas de timeout réseau ou de latence du protocole WinRM lors de l'initialisation des hôtes Windows.

### Gestion Épurée du Cycle de Vie

- Scripts de nettoyage intégrés s'exécutant automatiquement à la connexion pour forcer la limitation à une seule session active par instance.
- Procédure de nettoyage de masse automatisée retirant proprement les VM du domaine de l'administration centrale avant d'initier leur suppression physique du cluster.