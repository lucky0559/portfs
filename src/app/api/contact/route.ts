import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { from_name, from_email, subject, message } = await req.json();

    if (!from_name || !subject || !message) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    console.log("[contact route] Attempting to send email...");
    console.log("[contact route] Gmail user:", process.env.GMAIL_USER);
    console.log("[contact route] App password set:", !!process.env.GMAIL_APP_PASSWORD);

    const result = await transporter.sendMail({
      from: `"Lucky Angelo Portfolio" <${process.env.GMAIL_USER}>`,
      replyTo: from_email || undefined,
      to: process.env.GMAIL_USER,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;color:#331D2C">
          <h2 style="color:#331D2C;border-bottom:2px solid #A78295;padding-bottom:8px">
            New message from your portfolio
          </h2>
          <p><strong>Name:</strong> ${from_name}</p>
          <p><strong>Email:</strong> ${from_email || "Not provided"}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top:16px;padding:16px;background:#f5f5f5;border-radius:8px;white-space:pre-line">
            ${message}
          </div>
        </div>
      `
    });

    console.log("[contact route] Email sent successfully:", result.messageId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact route] ERROR:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
