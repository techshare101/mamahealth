# 🔑 How to Add Your OpenAI API Key

## Quick Setup (2 minutes)

### 1. Open the `.env.local` file
Located in the root directory: `c:/Users/valen/Development/mamahealth/.env.local`

### 2. Replace the placeholder with your actual API key

**Before:**
```env
OPENAI_API_KEY=your_openai_api_key_here
```

**After:**
```env
OPENAI_API_KEY=sk-proj-abc123...your-actual-key
```

### 3. Save the file

### 4. The server will automatically reload!

No need to restart - Next.js will pick up the change automatically.

## Where to Get Your API Key

1. Visit: https://platform.openai.com/api-keys
2. Sign in with your OpenAI account
3. Click **"Create new secret key"**
4. Give it a name like "MamaHealth Dev"
5. Copy the key (starts with `sk-proj-` or `sk-`)
6. Paste it into `.env.local`

## Test It!

1. Click the floating **"Mama is listening..."** button
2. Type: "My child has a fever of 38°C"
3. Mama will respond with caring health guidance! 🌺

## Important Notes

- ⚠️ **Never commit `.env.local` to Git** - it's already in `.gitignore`
- 💰 **API costs** - GPT-4o mini is very affordable (~$0.15 per 1M tokens)
- 🔒 **Keep your key secret** - don't share it publicly
- ✅ **Production** - Use environment variables in Vercel for deployment

---

**That's it!** You're ready to chat with Mama 💖
