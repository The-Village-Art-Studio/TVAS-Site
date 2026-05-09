import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'info@tvas.ca';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // 1. Save to database
    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || 'General Inquiry',
        message: message.trim(),
      },
    });

    // 2. Send notification email via Resend (non-blocking on failure)
    try {
      await resend.emails.send({
        from: 'The Village Art Studio <onboarding@resend.dev>',
        to: [NOTIFICATION_EMAIL],
        replyTo: email,
        subject: `New Contact: ${subject || 'General Inquiry'} — from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
            <div style="background: #0ea5e9; color: white; padding: 20px 28px; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 800;">New Contact Form Submission</h1>
              <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.85;">The Village Art Studio Website</p>
            </div>
            <div style="background: white; padding: 28px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; border-top: none;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; width: 100px;">Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0ea5e9;"><a href="mailto:${email}" style="color: #0ea5e9;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">Subject</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${subject || 'General Inquiry'}</td>
                </tr>
              </table>
              <div style="margin-top: 24px;">
                <p style="font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 10px;">Message</p>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; color: #334155; line-height: 1.7; white-space: pre-wrap;">${message}</div>
              </div>
              <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Your inquiry')}" style="display: inline-block; background: #0ea5e9; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">Reply to ${name}</a>
              </div>
            </div>
            <p style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 20px;">Lead ID: ${lead.id} · Submitted ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}</p>
          </div>
        `,
      });
    } catch (emailError) {
      // Email failure is non-fatal — lead is already saved in DB
      console.error('Resend email failed:', emailError);
    }

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit. Please try again.' },
      { status: 500 }
    );
  }
}
