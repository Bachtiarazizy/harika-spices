// File: app/api/send-inquiry/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { productName, name, email, company, quantity, message } = body;

    // Basic validation
    if (!name || !email || !message || !productName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("=== EMAIL DEBUGGING ===");
    console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
    console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("BUSINESS_EMAIL:", process.env.BUSINESS_EMAIL);

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 465,
      secure: true, // true for 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true, // Enable debug output
      logger: true, // Log information in console
    });

    // Test connection
    console.log("Testing SMTP connection...");
    try {
      await transporter.verify();
      console.log("✅ SMTP connection successful");
    } catch (verifyError) {
      console.error("❌ SMTP verification failed:", verifyError);
      return NextResponse.json({ error: "SMTP connection failed", details: verifyError.message }, { status: 500 });
    }

    // Simple email options for testing
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.BUSINESS_EMAIL,
      subject: `Test Inquiry: ${productName}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Product: ${productName}
Quantity: ${quantity || "Not specified"}
Message: ${message}

Sent at: ${new Date().toISOString()}
      `,
    };

    console.log("Sending email with options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    // Send email
    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", result);
    console.log("Message ID:", result.messageId);
    console.log("Response:", result.response);

    return NextResponse.json({
      message: "Email sent successfully",
      messageId: result.messageId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ API Error:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json({ error: "Failed to send email", details: error.message }, { status: 500 });
  }
}
