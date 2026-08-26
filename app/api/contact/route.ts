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

    // Get recipient email with defensive fallback
    const envEmail = process.env.CONTACT_EMAIL;
    console.log('CONTACT_EMAIL env variable exists:', !!envEmail);
    console.log('CONTACT_EMAIL env value:', envEmail);

    // Use environment variable if valid, otherwise use fallback
    let recipientEmail = 'hagaratef153@gmail.com';
    
    if (envEmail && envEmail.trim()) {
      const trimmed = envEmail.trim();
      // Only use env email if it passes basic validation
      if (emailRegex.test(trimmed)) {
        recipientEmail = trimmed;
        console.log('Using CONTACT_EMAIL from environment:', recipientEmail);
      } else {
        console.warn('CONTACT_EMAIL failed validation, using fallback');
      }
    } else {
      console.log('CONTACT_EMAIL not set or empty, using fallback');
    }

    // Final validation
    if (!emailRegex.test(recipientEmail)) {
      console.error('Final recipient email validation failed:', recipientEmail);
      return NextResponse.json(
        { error: 'Invalid recipient email configuration' },
        { status: 500 }
      );
    }

    console.log('Final recipient email to use:', recipientEmail);

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
