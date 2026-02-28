import { NextRequest, NextResponse } from 'next/server'
import { MailtrapClient } from 'mailtrap'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const mailtrapToken = process.env.MAILTRAP_TOKEN

    if (!mailtrapToken) {
      console.error('MAILTRAP_TOKEN not configured')
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 500 }
      )
    }

    const client = new MailtrapClient({ token: mailtrapToken })

    const sender = {
      email: "hello@demomailtrap.co",
      name: "VAITOR Portfolio Contact",
    }

    const recipients = [
      {
        email: "reevelobo@gmail.com",
      }
    ]

    await client.send({
      from: sender,
      to: recipients,
      subject: `New Transmission: ${name}`,
      text: `Message from ${name} (${email}):\n\n${message}`,
      category: "Contact Form",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Inter, -apple-system, sans-serif; background: #09090B; color: #F5F5F7; margin: 0; padding: 40px; }
              .container { max-width: 600px; margin: 0 auto; background: #18181B; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
              .header { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); padding: 40px; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.02em; color: #F5F5F7; }
              .header p { margin: 8px 0 0; font-size: 13px; color: rgba(245,245,247,0.5); letter-spacing: 0.1em; text-transform: uppercase; }
              .body { padding: 40px; }
              .field { margin-bottom: 24px; }
              .field-label { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #818CF8; margin-bottom: 8px; }
              .field-value { font-size: 16px; color: #F5F5F7; line-height: 1.6; }
              .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 24px 0; }
              .footer { text-align: center; padding: 24px 40px; border-top: 1px solid rgba(255,255,255,0.05); }
              .footer p { font-size: 12px; color: rgba(161,161,170,0.5); margin: 0; letter-spacing: 0.05em; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>VAITOR</h1>
                <p>New Transmission Received</p>
              </div>
              <div class="body">
                <div class="field">
                  <div class="field-label">From</div>
                  <div class="field-value">${name}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email</div>
                  <div class="field-value"><a href="mailto:${email}" style="color: #818CF8; text-decoration: none;">${email}</a></div>
                </div>
                <div class="divider"></div>
                <div class="field">
                  <div class="field-label">Message</div>
                  <div class="field-value" style="white-space: pre-wrap;">${message}</div>
                </div>
              </div>
              <div class="footer">
                <p>VAITOR · Reeve Lobo · reevelobo@gmail.com</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
