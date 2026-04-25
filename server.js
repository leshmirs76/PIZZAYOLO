// 🍕 Pizza Yolo — Serveur Stripe
const express = require('express');
const path = require('path');
const app = express();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(STRIPE_SECRET_KEY);

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Redirige / vers pizzeria.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pizzeria.html'));
});

// Créer une session Stripe Checkout
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, description, mode } = req.body;
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Commande Pizza Yolo (${mode === 'emporter' ? 'À emporter' : 'Livraison'})`,
            description: description,
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${baseUrl}/remerciement.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pizzeria.html?payment=cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Erreur Stripe:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🍕 Pizza Yolo running on port ${PORT}`);
});
