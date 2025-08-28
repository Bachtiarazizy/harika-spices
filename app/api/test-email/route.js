// File: app/api/test-email/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email } = await req.json();

    // Basic validation
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    console.log("=== SIMPLE EMAIL TEST ===");
    console.log("Name:", name);
    console.log("Email:", email);

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@harikaspices.com",
        pass: "Harika1610_",
      },
      debug: true,
      logger: true,
    });

    // Test connection
    console.log("Testing SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection successful");

    // Simple email
    const mailOptions = {
      from: "info@harikaspices.com",
      to: "pointplus9963@gmail.com", // Fixed recipient for testing
      subject: `Test Email from ${name}`,
      text: `
Hello!

This is a test email from the website.

Name: ${name}
Email: ${email}
Time: ${new Date().toISOString()}

Best regards,
HariKa Spices
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Test Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #f8f9fa; padding: 30px; border-radius: 10px;">
    <h2 style="color: #2c3e50; margin-bottom: 20px;">Test Email Received</h2>
    
    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #3498db;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    </div>
    
    <p style="margin-top: 20px; color: #7f8c8d;">
      This is an automated test email from HariKa Spices website.
    </p>
  </div>
</body>
</html>
      `,
    };

    console.log("Sending email...");
    const result = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully");
    console.log("Message ID:", result.messageId);
    console.log("Response:", result.response);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      messageId: result.messageId,
      response: result.response,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
