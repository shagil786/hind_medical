import nodemailer from "nodemailer";

export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.example.com", // Your SMTP server (Gmail, etc.)
      port: 465, // Port number (SSL)
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });
  }

  async sendMail(to: string, subject: string, message: string, html?: string) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        message: message,
        html: html,
    };

    try {
        const info = await this.transporter.sendMail(mailOptions);
        console.log(info);
    } catch(error) {
        console.log('Error sending email:', error);
    }
  }
}
