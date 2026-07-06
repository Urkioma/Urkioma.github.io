---
title: "Refonte Automatisee des Droits d'Acces (ACL) & Alignement Active Directory"
order: 5
description: "Conception et deploiement d'un pipeline d'automatisation PowerShell pour la migration complete d'un serveur de fichiers partage vers un modele de securite standardise AGDLP."
shortDescription: "Pipeline PowerShell de restructuration et d'automatisation des permissions NTFS via la methode AGDLP"
preview:
  type: "image"
  url: "/projects/powershell.png"
color: "peach"
tech:
  - name: "PowerShell"
    color: "peach"
  - name: "Active Directory"
    color: "lavender"
  - name: "Windows Server"
    color: "rose"
githubUrl: "https://github.com/urkioma"
featured: true
---

## Le Projet

Face à une dérive sécuritaire majeure sur un serveur de fichiers partagé multi-services (RH, Informatique, Budget, etc.), ce projet visait à assainir et standardiser l'intégralité des accès. L'accumulation historique de permissions nominatives, l'explosion de groupes obsolètes et la rupture fréquente de l'héritage rendaient l'infrastructure impossible à auditer. La solution a consisté à concevoir un pipeline d'automatisation complet pour basculer le modèle vers une architecture propre respectant la méthodologie stricte **AGDLP** (Accounts, Global groups, Domain Local groups, Permissions).

## Le Workflow d'Automatisation

La migration et la mise en conformité ont été orchestrées à travers un pipeline logique découpé en 5 étapes automatisées :

### Étape 1 : Audit de l'existant & Data Mining
Extraction des listes de contrôle d'accès (ACL) actives sur l'ensemble de l'arborescence. Utilisation de filtres avancés pour ignorer les comptes systèmes immuables (`Système`, `Administrateurs`, `Créateur Propriétaire`) afin d'isoler uniquement les anomalies — droits nominatifs résiduels et groupes obsolètes — exportées dans un rapport d'audit au format CSV.

### Étape 2 : Provisioning Automatique de l'AD
Parsing automatisé du fichier de structure pour générer la nomenclature des nouveaux groupes de sécurité cibles dans l'Unité d'Organisation (OU) correspondante de l'Active Directory. Chaque dossier se voit attribuer une paire de groupes uniques dédiés : Lecture Seule (`-R`) et Modification (`-RW`).

### Étape 3 : Migration des Identités
Exécution d'un script d'analyse des correspondances. Le script récupère de manière dynamique les membres des anciens groupes ou les utilisateurs isolés identifiés lors de l'audit, puis injecte automatiquement ces comptes dans les nouveaux groupes globaux AD correspondants, en fonction de leur niveau de privilèges initial.

### Étape 4 : Déploiement des nouvelles matrices NTFS
Génération et application dynamique d'objets `.NET` `FileSystemAccessRule` sur les dossiers racines. Le script s'assure de la configuration stricte des drapeaux d'héritage (`InheritanceFlags`) et de propagation pour garantir la diffusion descendante et homogène des droits sur toutes les sous-arborescences.

### Étape 5 : Nettoyage & Recouvrement (Hardening)
Pilotage de l'outil en ligne de commande `icacls` via PowerShell pour purger définitivement les anciens droits et comptes nominatifs. Le script intègre une liste blanche de sécurité (*whitelist*) pour sanctuariser les groupes transverses indispensables au maintien des services.

## Fonctionnalités Clés & Robustesse

- **Développement Durci** : Utilisation intensive d'objets personnalisés (`[pscustomobject]`), de structures de gestion des erreurs (`try/catch`) et manipulation native des flux de données via `Import-Csv` et `Export-Csv`.
- **Maîtrise de la Sécurité Windows** : Manipulation fine des énumérations de sécurité complexes du framework `.NET` (`System.Security.AccessControl`) et interaction directe avec le module Active Directory.

## Le Bilan

### Sécurité & Principe du Moindre Privilège
Alignement à 100 % de l'infrastructure de stockage sur les recommandations de sécurité. Élimination complète et définitive des droits nominatifs en production.

### Gouvernance & Conformité
Le serveur de fichiers est devenu entièrement auditable en quelques secondes. L'écart entre la politique théorique et les droits réels est désormais nul.

### Efficacité Opérationnelle
Gain de temps massif pour l'équipe d'administration système. L'attribution des privilèges pour un collaborateur ou un nouvel arrivant se fait exclusivement par intégration dans un groupe AD, sans jamais manipuler les dossiers physiques.