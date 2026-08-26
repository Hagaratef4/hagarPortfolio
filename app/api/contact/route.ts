import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured. Please add RESEND_API_KEY to environment variables.' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, projectType, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get and sanitize recipient email
    const rawContactEmail = process.env.CONTACT_EMAIL?.trim() || 'hagaratef153@gmail.com';
    console.log('Raw CONTACT_EMAIL from env:', process.env.CONTACT_EMAIL);
    console.log('Recipient email after trim:', rawContactEmail);

    // Remove only problematic characters (backslashes and non-ASCII)
    const recipientEmail = rawContactEmail
      .replace(/\\/g, '') // Remove backslashes
      .replace(/[^\x00-\x7F]/g, ''); // Remove non-ASCII characters

    console.log('Recipient email after sanitization:', recipientEmail);

    // Validate recipient email format
    if (!emailRegex.test(recipientEmail)) {
      console.error('Invalid recipient email format:', recipientEmail);
      console.error('Raw value was:', rawContactEmail);
      return NextResponse.json(
        { error: 'Invalid recipient email configuration' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #4a7c59; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
              <p style="margin: 0;"><strong>Message:</strong></p>
              <p style="margin-top: 10px; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <p style="margin-top: 30px; color: #666; font-size: 12px;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
