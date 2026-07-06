---
title: "Supervision Globale & SIEM : Centreon, Graylog & Wazuh"
order: 4
description: "Deploiement d'une tour de controle d'infrastructure associant la supervision proactive Centreon (metriques et alertes SMS/Mail), la centralisation Graylog et la cybersecurite active via le SIEM Wazuh."
shortDescription: "Mise en place d'une infrastructure de supervision, centralisation de logs et SIEM"
preview:
  type: "image"
  url: "/projects/centreon_logo.png"
color: "rose"
tech:
  - name: "Centreon"
    color: "rose"
  - name: "Graylog"
    color: "mint"
  - name: "Wazuh (SIEM)"
    color: "lavender"
githubUrl: "https://github.com/urkioma"
featured: true
---

## Le Projet

Garantir la haute disponibilité et la sécurité d'un système d'information exige une visibilité totale et en temps réel. Ce projet consiste à unifier la supervision de l'infrastructure, la centralisation de la télémétrie et la détection des cybermenaces. L'objectif était de bâtir une tour de contrôle capable de détecter proactivement les pannes matérielles, d'anticiper les dégradations environnementales et de répondre instantanément aux comportements suspects.

## Architecture & Technologies

### Supervision Proactive & Alerting (Centreon)

- **Contrôle d'infrastructure global** : Surveillance continue de la santé des serveurs physiques (CPU, RAM, disques), de la disponibilité des hyperviseurs et de la réactivité des sites web et applications intranet.
- **Surveillance environnementale** : Intégration de sondes de température SNMP au sein des salles serveurs et des sous répartiteurs pour prévenir les risques thermiques et les pannes matérielles critiques.
- **Notification multi-canal** : Configuration d'un moteur d'alerting dynamique assurant l'envoi de courriels et de SMS (via passerelle dédiée) en cas de franchissement de seuils critiques, garantissant une réactivité 24/7 des équipes d'astreinte.

### Gestion des Logs à Grande Échelle (Graylog)

- **Centralisation des données** : Collecte, indexation et normalisation des flux de journaux d'événements provenant de l'ensemble des équipements réseau, serveurs Linux et Windows.
- **Analyse et tableaux de bord** : Création de requêtes d'analyse et de pipelines de parsing pour structurer les données brutes, facilitant le dépannage rapide lors d'incidents techniques.

### Détection d'Intrusion & Sécurité Active (Wazuh SIEM)

- **Analyse comportementale (HIDS/SIEM)** : Déploiement d'agents Wazuh pour surveiller l'intégrité des fichiers système, détecter les anomalies de configuration et corréler les logs de sécurité.
- **Réponse active (Fail2ban centralisé)** : Configuration de mécanismes de réponse automatisée bloquant instantanément au niveau du pare-feu les adresses IP à l'origine d'attaques par force brute ou de scans malveillants récurrents, centralisant la logique de défense du périmètre.

## Fonctionnalités Clés

### Visibilité à 360° & Anticipation

- Tableaux de bord unifiés permettant de corréler une alerte de performance (Centreon) avec les journaux d'erreurs applicatifs (Graylog).
- Seuils d'alerte configurés intelligemment pour éviter le bruit et la fatigue des alertes tout en assurant la protection du matériel en salle machine.

### Posture de Sécurité Renforcée

- Traçabilité et conformité totale grâce à la conservation centralisée des logs d'audit hors des machines cibles (impossibles à effacer par un attaquant local).
- Contre-mesures immédiates et autonomes face aux techniques de reconnaissance et d'intrusion réseau courantes.