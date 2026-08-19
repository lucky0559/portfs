import nodemailer from "nodemailer";

export type PortfolioEmail = {
  fromName: string;
  replyTo?: string;
  subject: string;
  bodyHtml: string;
};

export async function sendPortfolioEmail(email: PortfolioEmail): Promise<void> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error("Email transport is not configured");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass }
  });

  await transporter.sendMail({
    from: `"Lucky Angelo Portfolio" <${user}>`,
    replyTo: email.replyTo || undefined,
    to: user,
    subject: email.subject,
    html: email.bodyHtml
  });
}
