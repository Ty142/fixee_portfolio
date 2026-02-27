# Vercel Deployment Guide - Fixee Frontend

## Problem Fixed
**Error**: `sh: line 1: /vercel/path0/file_example/node_modules/.bin/vite: Permission denied`

**Root Cause**: 
- `vite` was in `devDependencies` instead of `dependencies`
- Vercel production builds need build tools in `dependencies`
- Package name had special characters causing issues

## Changes Made

### 1. package.json
- ✅ Moved `vite` from `devDependencies` to `dependencies`
- ✅ Fixed package name from `"Cải thiện UI/UX"` to `"fixee-ui"` (npm naming rules)

### 2. vercel.json (NEW)
- ✅ Created Vercel configuration file
- ✅ Specified build command, output directory, and framework

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Import Project**: Click "Add New" → "Project"
3. **Connect Git Repository**: Select your GitHub/GitLab repo
4. **Configure Project**:
   - Framework Preset: `Vite`
   - Root Directory: `Portfolio_Fixee/file_example` (or leave empty if repo root is file_example)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)

5. **Environment Variables** (if needed):
   - Add `VITE_API_BASE_URL` with your backend URL
   - Example: `https://your-backend.onrender.com/api/v1`

6. **Deploy**: Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Navigate to project directory
cd Portfolio_Fixee/file_example

# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Vercel Configuration Details

### vercel.json
```json
{
  "buildCommand": "npm install && npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### package.json (Key Changes)
```json
{
  "name": "fixee-ui",  // ✅ Fixed: No special characters
  "dependencies": {
    // ... other deps
    "vite": "6.3.5"  // ✅ Moved from devDependencies
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react-swc": "^3.10.2"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

## Environment Variables for Production

Create these in Vercel Dashboard → Project Settings → Environment Variables:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api/v1
```

## Troubleshooting

### Issue: "Permission denied" on vite binary
**Solution**: ✅ Fixed - Moved vite to dependencies

### Issue: Build fails with module not found
**Solution**: Make sure all dependencies are in `dependencies`, not `devDependencies`

### Issue: Environment variables not working
**Solution**: 
- Prefix all env vars with `VITE_` for Vite projects
- Add them in Vercel Dashboard, not just .env file
- Redeploy after adding env vars

### Issue: 404 on routes (SPA routing)
**Solution**: Vercel auto-handles this for Vite, but if needed, add to vercel.json:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Post-Deployment Checklist

- [ ] Verify build completes successfully
- [ ] Check deployment URL works
- [ ] Test login/signup functionality
- [ ] Verify API calls work (check CORS if issues)
- [ ] Test language switcher
- [ ] Check responsive design on mobile
- [ ] Verify all routes work correctly

## Production URL
After deployment, Vercel will provide:
- Production URL: `https://your-project.vercel.app`
- Preview URLs for each commit/PR

## Connecting to Backend

Make sure your backend (on Render) has CORS configured to allow your Vercel domain:

```typescript
// Backend server.ts
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://your-project.vercel.app',  // Add your Vercel URL
    'https://*.vercel.app'  // Allow all preview deployments
  ],
  credentials: true
};
```

## Next Steps

1. ✅ Commit and push changes to Git
2. ✅ Deploy to Vercel using Option 1 or 2 above
3. ✅ Add environment variables in Vercel Dashboard
4. ✅ Update backend CORS to allow Vercel domain
5. ✅ Test the production deployment

## Support

If you encounter issues:
- Check Vercel deployment logs
- Verify all dependencies are installed
- Check browser console for errors
- Verify backend CORS settings
