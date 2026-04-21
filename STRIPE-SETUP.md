# Configuration Stripe — Pizza Yolo

## Étapes rapides (5 minutes)

### 1. Créer un compte Stripe
- Va sur https://stripe.com et clique **"Commencer"**
- Remplis ton email + mot de passe
- Pas besoin de vérifier ton identité pour le mode test

### 2. Récupérer tes clés API
- Dans le dashboard Stripe, va dans **Developers > API Keys**
- Tu verras 2 clés en mode **test** :
  - `Publishable key` → commence par `pk_test_...`
  - `Secret key` → commence par `sk_test_...`

### 3. Coller tes clés

**Dans `pizzeria.html`** (ligne ~1470) :
```
const STRIPE_PK = 'pk_test_VOTRE_CLE_STRIPE_ICI';
```
→ Remplace `pk_test_VOTRE_CLE_STRIPE_ICI` par ta vraie publishable key

**Dans `server.js`** (ligne 21) :
```
const STRIPE_SECRET_KEY = 'sk_test_VOTRE_CLE_SECRETE_ICI';
```
→ Remplace `sk_test_VOTRE_CLE_SECRETE_ICI` par ta vraie secret key

### 4. Installer et lancer

Ouvre un terminal dans le dossier Pizza Yolo et tape :
```bash
npm install express stripe
node server.js
```

### 5. Tester
- Ouvre http://localhost:3000/pizzeria.html
- Ajoute des pizzas au panier
- Clique "Carte Bancaire"
- Stripe te redirige vers sa page de paiement
- Carte de test : `4242 4242 4242 4242` — date future — CVC quelconque

## Passer en production (quand tu es prêt)

1. Active ton compte Stripe (vérification d'identité)
2. Dans le dashboard → bascule en mode **Live**
3. Remplace les clés `pk_test_` et `sk_test_` par `pk_live_` et `sk_live_`
4. Change `http://localhost:3000` par ton vrai domaine dans `server.js`

## Apple Pay / Google Pay

Stripe Checkout active automatiquement Apple Pay et Google Pay si :
- Tu es en mode **live** (pas test)
- Le client utilise Safari (Apple Pay) ou Chrome (Google Pay)
- Tu as vérifié ton domaine dans Stripe Dashboard > Settings > Payment methods
