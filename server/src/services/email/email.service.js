// import brevo from "../../config/brevo.config.js";
import brevo from "../../config/brevo.js";

export const sendContactEmails = async ({
  name,
  email,
  message,
}) => {
  // Email to you
  await brevo.sendTransacEmail({
    sender: {
      email: process.env.SENDER_EMAIL,
      name: "Portfolio Website",
    },
    to: [
      {
        email: process.env.ADMIN_EMAIL,
      },
    ],
    subject: "New Contact Form Submission",
    htmlContent: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  // Thank-you email to user
  await brevo.sendTransacEmail({
    sender: {
      email: process.env.SENDER_EMAIL,
      name: "Portfolio Website",
    },
    to: [
      {
        email,
      },
    ],
    subject: "Thank You For Contacting Us",
    htmlContent: `
      <h2>Thank You ${name}</h2>
      <p>We have received your message.</p>
      <p>We'll get back to you soon.</p>
    `,
  });
};