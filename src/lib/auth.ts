import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

// Database Connection String & Clients
const MONGODB_URI =
  "mongodb+srv://jannatjr648:Rj008765@cluster0.fggcizt.mongodb.net/bazardor?retryWrites=true&w=majority";

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
                  <span style="background: #f4f6f3; padding: 12px 24px; font-size: 24px; font-weight: bold; letter-spacing: 6px; color: #058847; border-radius: 8px; border: 1px border #d1d5db; display: inline-block;">${otp}</span>
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
      clientId: "Ov23livWFmbLj8Szr3vt",
      clientSecret: "a6ac69909ce66ba4c0b7738937b00bce57e128bd",
    },
  },
  secret: "bazardor_secret_key_123456789",
  baseURL: "http://localhost:3000",
});