# Hackatweet 🐦  
Projet hackathon
--------------------------------

Bienvenue sur **Hackatweet**, une application Web temps-réel, développée pendant le hackathon du 02/05/2025 au 05/05/2025.  
Le dépôt est organisé en deux parties :

| Dossier    | Technos principales | Port par défaut |
|------------|--------------------|-----------------|
| `backend`  | Node.js + Express  | 3000            |
| `frontend` | Next.js / React    | 3001            |

---

## 1. Mise en place de l’environnement de dev

> Pré-requis : **Git**, **Node.js ≥ 16** et **Yarn** (ou `npm`).

```bash
# Cloner le dépôt dépot distant
git clone https://github.com/ThomasMoulins/hackatweet.git
cd hackatweet

# Lancer le back
cd backend
yarn install
yarn start     # http://localhost:3000

# Lancer le front (nouvel onglet/terminal)
cd frontend
yarn install
yarn dev     # http://localhost:3001
```

---

## 2. Travail en équipe

```bash
# Créer une branche
git branch branchName

# Changer de branche
git checkout branchName

# Valider son travail
git add .
git commit -m "change"

# Récupérer les modifications du dépot distant
git pull origin main

# Revenir sur la branche principale et fusionner
git checkout main
git merge branchName

# Supprimer la branche locale
git branch -d branchName

# Pousser les modifications vers GitHub
git push origin main
```
