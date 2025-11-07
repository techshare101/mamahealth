# 🌺 MamaHealth Setup Guide

## Environment Variables Setup

To enable the AI chat functionality, you need to configure your OpenAI API key:

### Step 1: Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (it starts with `sk-`)

### Step 2: Configure Environment Variables

1. Open the `.env.local` file in the root directory
2. Replace `your_openai_api_key_here` with your actual API key:

```env
OPENAI_API_KEY=sk-your-actual-key-here
```

3. Save the file

### Step 3: Restart the Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Testing the Chat Widget

1. Open http://localhost:3002 (or your dev server port)
2. Click the floating "Mama is listening..." button in the bottom right
3. Type a symptom like "My child has a fever"
4. Mama will respond with caring, AI-powered health guidance

## Features

✅ **AI-Powered Triage** - GPT-4o mini provides warm, mother-like health guidance
✅ **Brand-Aligned UI** - Coral, sage, and plum colors throughout
✅ **Smooth Animations** - Framer Motion for delightful interactions
✅ **Mobile Responsive** - Works beautifully on all devices
✅ **Safety First** - Always includes red flags and doctor visit advice

## Troubleshooting

### "I'm not fully set up yet" message
- Your API key is not configured in `.env.local`
- Make sure the file is named exactly `.env.local` (not `.env.local.txt`)
- Restart the dev server after adding the key

### Chat not opening
- Check browser console for errors
- Make sure all dependencies are installed: `npm install`

### API errors
- Verify your OpenAI API key is valid
- Check you have credits in your OpenAI account
- Ensure you're using the correct model (`gpt-4o-mini`)

## Next Steps

1. **Supabase Integration** - Store beta signups
2. **Analytics** - Track chat interactions
3. **Deployment** - Deploy to Vercel with production API key
4. **Custom Domain** - Set up mamahealth.africa

---

Need help? The MamaHealth team is here for you! 🌺
