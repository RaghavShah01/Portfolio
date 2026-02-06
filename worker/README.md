# Cloudflare Worker - AI Chatbot Proxy

This worker securely proxies requests to OpenRouter API, keeping your API key private.

## Setup Instructions (5 minutes)

### Step 1: Create Cloudflare Account
1. Go to [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
2. Create a free account (no credit card required)

### Step 2: Create the Worker
1. In Cloudflare Dashboard, go to **Workers & Pages**
2. Click **Create** → **Create Worker**
3. Name it: `portfolio-ai-proxy`
4. Click **Deploy** (you'll edit the code next)

### Step 3: Add Your Code
1. Click **Edit Code**
2. Delete the default code
3. Copy and paste the entire content of `index.js` from this folder
4. Click **Deploy**

### Step 4: Add Your API Key (Secure)
1. Go back to the Worker overview
2. Click **Settings** → **Variables**
3. Under **Environment Variables**, click **Add variable**
4. Add:
   - **Variable name:** `OPENROUTER_API_KEY`
   - **Value:** `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`
5. Click **Encrypt** (recommended for security)
6. Click **Save and Deploy**

### Step 5: Get Your Worker URL
Your worker URL will be:
```
https://portfolio-ai-proxy.<your-subdomain>.workers.dev
```

### Step 6: Update Your Portfolio
1. Open `js/chatbot.js`
2. Update the `API_PROXY_URL` with your actual worker URL:
```javascript
const API_PROXY_URL = 'https://portfolio-ai-proxy.your-subdomain.workers.dev';
```
3. Commit and push to GitHub

## Security Features

- **API Key Hidden**: Your API key is stored as an encrypted environment variable on Cloudflare
- **Origin Restriction**: Only requests from your GitHub Pages site are allowed
- **No Client Exposure**: The API key never reaches the browser

## Free Tier Limits

Cloudflare Workers free tier includes:
- **100,000 requests/day** (more than enough for a portfolio)
- **10ms CPU time per request**
- **No credit card required**

## Troubleshooting

### CORS Error
Make sure your GitHub Pages URL is in the `ALLOWED_ORIGINS` array in `index.js`:
```javascript
const ALLOWED_ORIGINS = [
  'https://raghavshah01.github.io',
  // Add other domains if needed
];
```

### 403 Forbidden
Your origin is not in the allowed list. Update `ALLOWED_ORIGINS` in the worker.

### API Error
Check that your `OPENROUTER_API_KEY` environment variable is set correctly.

## Testing

You can test your worker using curl:
```bash
curl -X POST https://portfolio-ai-proxy.your-subdomain.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek/deepseek-r1-0528:free","messages":[{"role":"user","content":"Hello"}]}'
```
