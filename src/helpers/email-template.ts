interface EmailService {
    subject: string;
    html: string;
}

const emailTemplate = {
    otpEmail: (otp: string): EmailService => ({
        subject: 'Your OTP Code for Account Verification',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
        <h2 style="color: #333;">Account Verification OTP</h2>
        <p>Thank you for registering! Your OTP code is:</p>
        <h1 style="color: #007bff;">${otp}</h1>
        <p>Please enter this code to verify your account. This code will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards, <br />Your Company Name</p>
      </div>
    `
    }),
    resetPasswordEmail: (resetLink: string): EmailService => ({
        subject: "Reset Your Password",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
            <h2 style="color: #333;">Reset Your Password</h2>
            <p>We received a request to reset the password for your account. Please click the link below to reset your password:</p>
            <a href="${resetLink}" style="color: #007bff; text-decoration: none; font-weight: bold;">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Best regards, <br />Your Company Name</p>
          </div>
        `
      }),
    
      // Welcome Email for New User
      welcomeEmail: (username: string): EmailService => ({
        subject: "Welcome to Our Platform!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
            <h2 style="color: #333;">Welcome, ${username}!</h2>
            <p>Thank you for signing up! We're thrilled to have you on board.</p>
            <p>Feel free to explore and let us know if you need any assistance.</p>
            <p>Best regards, <br />Your Company Name</p>
          </div>
        `
      }),
      passwordResetConfirmationEmail: (): EmailService => ({
        subject: "Your Password Has Been Reset",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
            <h2 style="color: #333;">Password Reset Confirmation</h2>
            <p>Your password has been successfully reset. If you did not perform this action, please contact our support team immediately.</p>
            <p>If this was you, no further action is needed.</p>
            <p>Best regards, <br />Your Company Name</p>
          </div>
        `
      }),
}

export {emailTemplate};