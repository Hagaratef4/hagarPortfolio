# Email Setup for Contact Form

The contact form uses [Resend](https://resend.com/) to send emails. Follow these steps to configure it:

## 1. Get a Resend API Key

1. Sign up at [resend.com](https://resend.com/)
2. Create an API key in your dashboard
3. Copy the API key

## 2. Add Environment Variables

Create a `.env.local` file in the root of your project and add:

```env
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=hagaratef153@gmail.com
```

Replace `your_resend_api_key_here` with your actual Resend API key.

The `CONTACT_EMAIL` is where the contact form submissions will be sent. You can change it to your preferred email address.

## 3. Deploy

When deploying to production (Vercel, Netlify, etc.), add these environment variables in your deployment platform's settings.

## Important Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- For production, use your deployment platform's environment variable settings
- The contact form will not work without these environment variables
