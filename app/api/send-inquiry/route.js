// File: app/api/send-inquiry/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  // 1. Dapatkan data dari body request
  // Di App Router, kita menggunakan req.json()
  const body = await req.json();
  const { productName, name, email, company, quantity, message } = body;

  // 2. Validasi input
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
  }

  try {
    let transporter;
    // Coba inisialisasi transporter dengan cara yang berbeda untuk mengatasi masalah bundling Turbopack
    if (typeof nodemailer.createTransport === "function") {
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else if (typeof (nodemailer.default && nodemailer.default.createTransport) === "function") {
      transporter = nodemailer.default.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      // Fallback jika kedua cara di atas tidak berhasil
      throw new Error("Nodemailer createTransport function not found. Check your import or bundler configuration.");
    }

    // 4. Konfigurasi email ke bisnis Anda
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.BUSINESS_EMAIL,
      replyTo: email,
      subject: `Product Inquiry: ${productName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            /* ... CSS Anda tidak perlu diubah ... */
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #392E20; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #392E20; }
            .product-name { color: #D97706; font-size: 1.2em; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Product Inquiry</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Product:</span>
                <span class="product-name">${productName}</span>
              </div>
              <div class="field">
                <span class="label">From:</span>
                <span>${name} (${email})</span>
              </div>
              ${
                company
                  ? `<div class="field">
                <span class="label">Company:</span>
                <span>${company}</span>
              </div>`
                  : ""
              }
              ${
                quantity
                  ? `<div class="field">
                <span class="label">Quantity:</span>
                <span>${quantity}</span>
              </div>`
                  : ""
              }
              <div class="field">
                <span class="label">Message:</span>
                <p>${message.replace(/\n/g, "  ")}</p>
              </div>
              <div class="field">
                <span class="label">Sent:</span>
                <span>${new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 5. Kirim email ke bisnis
    await transporter.sendMail(mailOptions);

    // 6. Konfigurasi email konfirmasi ke pengguna
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for your inquiry about ${productName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            /* ... CSS Anda tidak perlu diubah ... */
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #392E20; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You for Your Inquiry</h2>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for your interest in <strong>${productName}</strong>. We have received your inquiry and our team will contact you within 24 hours.</p>
              <p>If you have any urgent questions, please don't hesitate to contact us directly at <a href="mailto:${process.env.BUSINESS_EMAIL}">${process.env.BUSINESS_EMAIL}</a> or call +90 (542) 179-3483.</p>
              <p>Best regards,  
HariKa Spices Team</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 7. Kirim email konfirmasi
    await transporter.sendMail(userMailOptions);

    // 8. Kirim respons sukses
    // Di App Router, kita menggunakan NextResponse.json()
    return NextResponse.json({ message: "Inquiry sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    // Kirim respons error
    return NextResponse.json({ error: "Failed to send inquiry" }, { status: 500 });
  }
}
