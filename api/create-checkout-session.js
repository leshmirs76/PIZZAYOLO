const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, description, mode } = req.body;
    const baseUrl = `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
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
      success_url: `${baseUrl}/pizzeria.html?payment=success`,
      cancel_url: `${baseUrl}/pizzeria.html?payment=cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Erreur Stripe:', error.message);
    res.status(500).json({ error: error.message });
  }
};
