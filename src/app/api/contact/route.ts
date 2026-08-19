import { NextRequest, NextResponse } from "next/server";
import { sendPortfolioEmail } from "@/lib/email/sendLead";

export async function POST(req: NextRequest) {
  try {
    const { from_name, from_email, subject, message } = await req.json();

    if (!from_name || !subject || !message) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    await sendPortfolioEmail({
      fromName: from_name,
      replyTo: from_email,
      subject: `[Portfolio] ${subject}`,
      bodyHtml: `
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact route] ERROR:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
