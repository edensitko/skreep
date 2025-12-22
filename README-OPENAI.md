# OpenAI Chat Integration Setup

## Environment Variables Required

For the chat functionality to work in production, you need to set up the following environment variable:

```bash
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

## Getting Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key and save it securely

## Production Deployment Setup

### GitHub Pages (Current Setup)
Add the environment variable to your GitHub repository secrets:

1. Go to your repository on GitHub
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `NEXT_PUBLIC_OPENAI_API_KEY`
5. Value: Your OpenAI API key

### Security Considerations

Since this is a client-side implementation for static export:

1. **Domain Restrictions**: Set up domain restrictions in your OpenAI dashboard
   - Go to OpenAI Platform → Settings → API Keys
   - Edit your key and add `skreep.com` to allowed domains

2. **Usage Monitoring**: Monitor your API usage regularly
   - Set up usage alerts in OpenAI dashboard
   - Consider implementing rate limiting

3. **Key Rotation**: Rotate your API key periodically for security

## Testing Locally

1. Create a `.env.local` file in the project root:
```bash
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

2. Run the development server:
```bash
yarn dev
```

3. Test the chat functionality on the homepage

## Fallback Behavior

If the API key is not configured, the chat will show a friendly message directing users to contact you directly instead of failing silently.
