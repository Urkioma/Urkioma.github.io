---
title: "Industrialisation & Déploiement de Masse : Terraform, Ansible & Semaphore"
order: 3
description: "Automatisation complète du cycle de vie de 128 instances Windows de formation sur cluster Proxmox VE, provisionnées par Terraform, orchestrées via Ansible Semaphore et supervisées par Graylog."
shortDescription: "Provisioning Terraform et orchestration Ansible/Semaphore pour 128 instances de formation sur Proxmox"
preview: { type: "image", url: "/projects/ansible_bg.png" }
color: "lavender"
tech:
  [
    { name: "Terraform", color: "peach" },
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

### Infrastructure as Code & Provisionnement (Terraform & Proxmox)

- **Provisionnement déclaratif** : Utilisation du provider Terraform `bpg/proxmox` pour déclarer et instancier les 128 machines virtuelles de manière reproductible et maintenable.
- **Répartition & HA à la création** : Distribution dynamique des instances sur les différents nœuds du cluster Proxmox avec activation automatique de la Haute Disponibilité (HA) lors du déploiement.
- **Gestion fine de l'état (State)** : Découpage et contrôle du parallélisme (`-parallelism`) pour optimiser les appels d'API Proxmox et éviter la saturation du cluster lors des créations de masse.

### Configuration & Jonction de Domaine (Ansible)

- **Cycle de vie applicatif** : Playbooks Ansible déclenchés post-provisionnement pour la jonction au domaine Active Directory, le durcissement du système et le déploiement des logiciels métiers.
- **Déploiement hybride** : Modèle combinant IaC (Terraform crée les ressources et l'infrastructure) et Configuration Management (Ansible prépare l'environnement utilisateur).

### Conception du Master & Provisionnement (Cloudbase-Init)

- **Gestion du Master (Sysprep)** : Création d'une image de référence Windows durcie utilisant Cloudbase-Init pour contourner les limitations de jetons Sysprep et automatiser l'exécution de scripts au démarrage du système.
- **Configuration dynamique** : Exploitation de Cloud-Init (`configdrive2`) pour injecter à la volée la configuration réseau (adresses IP statiques, masques, passerelles) et les identifiants d'administration locale de chaque VM.

### Centralisation des Logs & Observabilité (Graylog)

- **Collecte centralisée** : Intégration transparente d'un agent de journalisation léger (NXLog CE) au sein du playbook Ansible de déploiement pour assurer le suivi immédiat des actions utilisateurs.
- **Supervision & Traçabilité** : Acheminement en temps réel des logs d'événements Windows vers un serveur Graylog, permettant l'audit global des sessions et des applications utilisées par les apprenants.

### Interface d'Orchestration (Ansible Semaphore)

- **Simplification du processus** : Déploiement de l'application web Ansible Semaphore pour encapsuler l'exécution des plans Terraform et des playbooks Ansible derrière une interface graphique épurée.
- **Autonomie opérationnelle** : Permet de déclencher en un clic les campagnes de déploiement ou de suppression globale des 128 machines virtuelles sans nécessiter d'accès en ligne de commande au serveur d'administration.

## Fonctionnalités Clés

### Robustesse & Performance de Masse

- **Exécution parallélisée maîtrisée** : Tuning fin des timeouts API et du parallélisme Terraform/Ansible par vagues pour garantir un déploiement fluide de l'ensemble du parc sans saturer les I/O du stockage Ceph/Local.
- **Mécanismes de résilience** : Gestion de la latence du boot Windows, de l'agent QEMU et du protocole WinRM lors de l'initialisation des hôtes avec mécanismes de retentatives automatiques.

### Gestion Épurée du Cycle de Vie

- **Limitation de session** : Scripts de nettoyage intégrés s'exécutant automatiquement à la connexion pour forcer la limitation à une seule session active par instance.
- **Destruction propre de masse** : Séquence automatisée retirant proprement les VM du domaine Active Directory avant la destruction physique des ressources par Terraform (`terraform destroy`).