# 🚀 Deploy MamaHealth to Vercel

## Quick Deploy Guide

### 1️⃣ Prerequisites
- ✅ GitHub repository: https://github.com/techshare101/mamahealth
- ✅ OpenAI API key (get from https://platform.openai.com/api-keys)
- ✅ Vercel account (sign up at https://vercel.com)

---

## 2️⃣ Deploy Steps

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com/new
   - Sign in with GitHub

2. **Import Repository**
   - Click "Import Project"
   - Select "Import Git Repository"
   - Enter: `techshare101/mamahealth`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add variable:
     ```
     Name: OPENAI_API_KEY
     Value: sk-proj-... (your OpenAI API key)
     ```
   - Select: Production, Preview, Development (all three)

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Get your live URL: `https://mamahealth-xxx.vercel.app`

---

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd mamahealth
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? mamahealth
# - Directory? ./
# - Override settings? No

# Add environment variable
vercel env add OPENAI_API_KEY
# Paste your OpenAI API key
# Select: Production, Preview, Development

# Deploy to production
vercel --prod
```

---

## 3️⃣ Verify Deployment

### Check Build Logs
- Go to Vercel dashboard
- Click on your deployment
- Check "Build Logs" tab
- Should see: ✅ Build completed successfully

### Test Live Site
1. **Visit your URL**: `https://mamahealth-xxx.vercel.app`
2. **Test landing page**: Should load with animations
3. **Test chat**: Click "Mama is listening..."
4. **Test voice**: Tap microphone, speak
5. **Test AI response**: Should get Mama's response
6. **Test voice output**: Should hear warm AI voice

---

## 4️⃣ Custom Domain (Optional)

### Add Custom Domain
1. Go to Vercel dashboard
2. Click on your project
3. Go to "Settings" → "Domains"
4. Add domain: `mamahealth.com` (or your domain)
5. Follow DNS configuration instructions
6. Wait for DNS propagation (5-30 minutes)

### Recommended Domains
- `mamahealth.app`
- `mamahealth.africa`
- `mamahealth.health`
- `askmamahealth.com`

---

## 5️⃣ Environment Variables

### Required
```bash
OPENAI_API_KEY=sk-proj-...
```

### Optional (Future)
```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Monitoring
SENTRY_DSN=https://...

# Database (future)
DATABASE_URL=postgresql://...
```

---

## 6️⃣ Automatic Deployments

### How It Works
- ✅ Push to `main` branch → Auto-deploy to production
- ✅ Push to other branches → Auto-deploy to preview
- ✅ Pull requests → Auto-deploy to preview URL
- ✅ Each deployment gets unique URL

### Preview Deployments
```bash
# Create feature branch
git checkout -b feature/new-voice

# Make changes and push
git push origin feature/new-voice

# Vercel automatically creates preview URL
# https://mamahealth-xxx-git-feature-new-voice.vercel.app
```

---

## 7️⃣ Performance Optimization

### Vercel Edge Network
- ✅ Global CDN (300+ locations)
- ✅ Automatic HTTPS
- ✅ HTTP/2 & HTTP/3
- ✅ Brotli compression
- ✅ Image optimization

### Caching Strategy
```typescript
// Already configured in route.ts
headers: {
  'Cache-Control': 'public, max-age=86400', // 24 hours
}
```

---

## 8️⃣ Monitoring & Analytics

### Vercel Analytics (Built-in)
1. Go to project settings
2. Enable "Analytics"
3. View real-time metrics:
   - Page views
   - Unique visitors
   - Top pages
   - Geographic distribution

### Vercel Speed Insights
1. Enable "Speed Insights"
2. Track Core Web Vitals:
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)
   - CLS (Cumulative Layout Shift)

---

## 9️⃣ Troubleshooting

### Build Fails
**Error**: `Module not found: Can't resolve 'openai'`
**Fix**: Already fixed! OpenAI package is now in package.json

**Error**: `OPENAI_API_KEY is not defined`
**Fix**: Add environment variable in Vercel dashboard

### Runtime Errors
**Error**: Voice not working
**Fix**: Check OPENAI_API_KEY is set correctly

**Error**: 500 Internal Server Error
**Fix**: Check Vercel function logs in dashboard

### Performance Issues
**Slow API responses**
- Check OpenAI API status
- Consider upgrading to tts-1-hd for better quality
- Implement request caching

---

## 🔟 Cost Estimation

### Vercel Pricing
- **Hobby Plan**: FREE
  - 100 GB bandwidth/month
  - Unlimited deployments
  - Automatic HTTPS
  - Perfect for testing!

- **Pro Plan**: $20/month
  - 1 TB bandwidth/month
  - Advanced analytics
  - Team collaboration
  - Custom domains

### OpenAI API Costs
- **GPT-4o mini**: $0.15 per 1M input tokens, $0.60 per 1M output tokens
- **TTS (tts-1)**: $15 per 1M characters
- **Average cost**: ~$0.005 per conversation (chat + voice)

### Example Monthly Costs
```
1,000 users/day × 30 days = 30,000 users/month
30,000 users × 2 messages avg = 60,000 messages
60,000 messages × $0.005 = $300/month

With 30% cache hit rate:
60,000 × 0.7 × $0.005 = $210/month
```

---

## 1️⃣1️⃣ Production Checklist

### Before Launch
- [ ] Test all features locally
- [ ] Add OPENAI_API_KEY to Vercel
- [ ] Test voice input/output
- [ ] Test offline mode
- [ ] Test on mobile devices
- [ ] Check all 13 languages
- [ ] Verify OTC recommendations
- [ ] Test dangerous symptom detection

### After Launch
- [ ] Monitor error logs
- [ ] Check API usage
- [ ] Monitor performance metrics
- [ ] Set up alerts for downtime
- [ ] Collect user feedback
- [ ] Plan feature updates

---

## 1️⃣2️⃣ Next Steps

### Immediate
1. Deploy to Vercel ✅
2. Test live site
3. Share with beta users
4. Collect feedback

### Short-term (1-2 weeks)
1. Add custom domain
2. Enable analytics
3. Monitor usage
4. Fix bugs
5. Optimize performance

### Long-term (1-3 months)
1. Add user authentication
2. Implement database
3. Add health records
4. Expand to more languages
5. Partner with clinics

---

## 🎉 Success!

Once deployed, your MamaHealth will be live at:
**https://mamahealth-xxx.vercel.app**

Share it with the world! 🌍💖🌺

---

## 📚 Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **OpenAI API**: https://platform.openai.com/docs
- **GitHub Repo**: https://github.com/techshare101/mamahealth

---

## 🆘 Support

### Issues?
- Check Vercel function logs
- Review build logs
- Check environment variables
- Test API key validity

### Need Help?
- Vercel Support: https://vercel.com/support
- GitHub Issues: https://github.com/techshare101/mamahealth/issues
- OpenAI Support: https://help.openai.com

---

**Version**: 4.0 "Mama Never Sleeps"  
**Status**: Ready to Deploy ✅  
**Platform**: Vercel  
**Estimated Deploy Time**: 2-3 minutes  
**Cost**: FREE (Hobby) or $20/month (Pro)
