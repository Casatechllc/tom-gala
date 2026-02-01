import { randomUUID } from 'crypto';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  const environment = process.env.SQUARE_ENVIRONMENT || 'Sandbox';

  if (!token || !locationId) {
    return { statusCode: 500, body: JSON.stringify({ error: "Configuration Error", details: "Missing Token or Location ID" }) };
  }

  try {
    const { cartItems } = JSON.parse(event.body);

    if (!cartItems || cartItems.length === 0) {
      return { statusCode: 400, body: 'Cart is empty' };
    }

    // 1. Build Line Items
    // We use standard integers (cents) for stability
    const line_items = cartItems.map(item => {
      const quantityValue = item.qty || item.quantity || 1;
      return {
        name: `${item.title || 'Art Print'} (11x14 Print)`,
        quantity: quantityValue.toString(),
        base_price_money: { amount: 2400, currency: 'USD' } // $24.00
      };
    });

    line_items.push({
      name: "Shipping & Handling",
      quantity: "1",
      base_price_money: { amount: 600, currency: 'USD' } // $6.00
    });

    const idempotencyKey = randomUUID();

    // 2. INTELLIGENT URL SELECTION
    // This answers your question: "What happens when it goes live?"
    // If you set SQUARE_ENVIRONMENT=Production in your .env, this AUTOMATICALLY
    // switches to the real live server. No code changes needed.
    const baseUrl = environment === 'Production'
      ? 'https://connect.squareup.com'         // Live (Real Money)
      : 'https://connect.squareupsandbox.com'; // Sandbox (Fake Money)

    console.log(`Connecting to Square (${environment})...`);

    // 3. Direct Secure Connection
    const response = await fetch(`${baseUrl}/v2/online-checkout/payment-links`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Square-Version': '2025-01-23'
      },
      body: JSON.stringify({
        idempotency_key: idempotencyKey,
        order: {
          location_id: locationId,
          line_items: line_items,
        },
        checkout_options: {
          redirect_url: (process.env.URL || event.headers.referer || 'http://localhost:8888') + '/success',
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Square API Error:", JSON.stringify(data, null, 2));
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: "Checkout failed", 
          details: data.errors?.[0]?.detail || "Authorization Failed. Check your Token." 
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ url: data.payment_link.url }),
    };

  } catch (error) {
    console.error("Backend Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server Error", details: error.message }),
    };
  }
};