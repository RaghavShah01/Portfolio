/**
 * Cloudflare Worker - OpenRouter API Proxy
 * This worker securely proxies requests to OpenRouter, keeping your API key private.
 *
 * SETUP:
 * 1. Go to https://dash.cloudflare.com/
 * 2. Create a Worker (Workers & Pages → Create → Worker)
 * 3. Paste this code
 * 4. Go to Settings → Variables → Add Environment Variable:
 *    - Name: OPENROUTER_API_KEY
 *    - Value: your-api-key-here
 * 5. Deploy and copy your worker URL
 */

// Allowed origins (add your GitHub Pages URL)
const ALLOWED_ORIGINS = [
  'https://raghavshah01.github.io',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:3000'
];

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Check origin
    const origin = request.headers.get('Origin');
    if (!isAllowedOrigin(origin)) {
      return new Response('Forbidden', { status: 403 });
    }

    try {
      // Get request body
      const body = await request.json();

      // Call OpenRouter API
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://raghavshah01.github.io/Portfolio/',
          'X-Title': 'Raghav Shah Portfolio'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      // Return response with CORS headers
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin || '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin || '*'
        }
      });
    }
  }
};

function isAllowedOrigin(origin) {
  if (!origin) return true; // Allow requests without origin (like from tools)
  return ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed));
}

function handleCORS(request) {
  const origin = request.headers.get('Origin');
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': isAllowedOrigin(origin) ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}
