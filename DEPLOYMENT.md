# LINA Deployment Guide

This guide explains how to deploy LINA across multiple platforms.

## Architecture

- **Frontend**: React/Vite on Vercel
- **Backend**: Node.js/Express on Render  
- **ML Server**: Python/Flask on Render
- **Database**: MySQL (external)

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

### Setup
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Import your GitHub repository
4. Set environment variables in Vercel Project Settings:
   ```
   VITE_API_URL=https://lina-opcw.onrender.com
   ```
5. Deploy!

## Backend Deployment (Render)

### Node.js Server (Backend)

1. Go to [render.com](https://render.com) and create a new Web Service
2. Connect your GitHub repository
3. Configure:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Port**: 3001

4. Set environment variables:
   ```
   PORT=3001
   ML_SERVER_URL=https://lina-ml-server.onrender.com
   DB_HOST=your_database_host
   DB_PORT=3307
   DB_NAME=Lina_baby
   DB_PASSWORD=your_database_password
   NODE_ENV=production
   ```

### Python ML Server

1. Create another Web Service on Render
2. Configure:
   - **Environment**: Python 3
   - **Build Command**: `pip install -r ml-server/requirements.txt`
   - **Start Command**: `python ml-server/app.py`
   - **Port**: 3002

3. Set environment variables:
   ```
   PORT=3002
   FLASK_ENV=production
   ```

## Environment Variables

### Vercel (Frontend)
- `VITE_API_URL`: URL of your backend on Render

### Render (Backend)
- `PORT`: 3001
- `ML_SERVER_URL`: URL of your ML server on Render
- `DB_HOST`: Your database host
- `DB_PORT`: 3307
- `DB_NAME`: Lina_baby
- `DB_PASSWORD`: Your database password
- `NODE_ENV`: production

### Render (ML Server)
- `PORT`: 3002
- `FLASK_ENV`: production

## Database Setup

The application uses MySQL. You can:
1. Keep it on your local machine and expose it via a tunnel
2. Move to a cloud database like AWS RDS or Render's PostgreSQL
3. Use a managed service like PlanetScale

## Monitoring

- Vercel: Check deployment logs in the Vercel dashboard
- Render: Check deploy logs in Render dashboard
- Both: Check application logs for errors

## Common Issues

**CORS Errors**: Make sure your backend has CORS enabled for your Vercel domain.
**Database Connection**: Verify credentials and network access from Render servers.
**Model Not Found**: Ensure `diabetes_risk_model.pkl` and `scaler.pkl` are in the repository.

## Updates & Redeployment

- Push to GitHub → Automatic deployment to Vercel and Render
- No manual redeploy needed!
