# Vercel Frontend Deployment Guide

## Quick Setup

### 1. Connect to Vercel
```bash
npm i -g vercel
vercel login
vercel link
```

### 2. Set Environment Variables in Vercel Dashboard

Go to: **Project Settings → Environment Variables**

Add the following:

| Name | Value | Environments |
|------|-------|--------------|
| `VITE_API_URL` | `https://lina-backend.onrender.com` | Production, Preview, Development |

**Note:** Replace `lina-backend.onrender.com` with your actual Render backend URL once deployed.

### 3. Deploy

```bash
npm run build
vercel --prod
```

## Troubleshooting

### Error: "VITE_API_URL is not defined"
- Make sure environment variable is set in Vercel Project Settings
- Rebuild the project: `vercel --prod`

### Error: "Cannot find module"
- Run `npm install` locally first
- Check `package.json` for correct dependencies

## Local Development

Create `.env.local` in the project root:
```
VITE_API_URL=http://localhost:3001
```

Then run: `npm run dev`

## Production URLs

Once deployed:
- **Frontend**: `https://lina.vercel.app` (or your custom domain)
- **Backend**: `https://lina-backend.onrender.com`
- **ML Server**: `https://lina-ml-server.onrender.com`
