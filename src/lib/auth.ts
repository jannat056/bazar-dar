import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

// Pull credentials safely from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const client = new MongoClient(MONGODB_URI);
const db = client.db("bazardor");
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // 1. Console Log for local development / quick debugging
        console.log(`====================================`);
        console.log(`🔑 Verification OTP for ${email}: ${otp}`);
        console.log(`====================================`);

        // 2. Dispatch OTP email via Resend Service
        try {
          await resend.emails.send({
            from: "Bazar Dor <onboarding@resend.dev>",
            to: [email],
            subject: "Bazar Dor - Account Verification OTP",
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px; max-width: 500px; margin: 0 auto;">
                <h2 style="color: #058847; margin-bottom: 8px;">Bazar Dor</h2>
                <p style="color: #374151; font-size: 14px;">Use the following One-Time Password (OTP) to verify your account:</p>
                <div style="text-align: center; margin: 20px 0;">
                  <span style="background: #f4f6f3; padding: 12px 24px; font-size: 24px; font-weight: bold; letter-spacing: 6px; color: #058847; border-radius: 8px; border: 1px solid #d1d5db; display: inline-block;">${otp}</span>
                </div>
                <p style="color: #6b7280; font-size: 12px; margin-top: 16px;">This verification code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
              </div>
            `,
          });
        } catch (err) {
          console.error("Failed to send OTP email via Resend:", err);
        }
      },
    }),
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});