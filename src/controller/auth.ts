import { Request, Response } from "express";
import { UserService } from "../service/authService";
import bcrypt from 'bcrypt';
import { MailService } from "../service/emailService";
import crypto from 'crypto';
import { emailTemplate } from "../helpers/email-template";

export class UserController {
    static async login(req: Request, res: Response) {
        try {
            const {email, password} = req?.body;

            if(!email || !password) {
                return res.status(400).json({message: 'Email and Password are required!'});
            }

            const user = await UserService.verifyEmail({email: email});

            if(!user) {
                return res.status(400).json({message: 'User not found!'});
            }

            const isMatch = await bcrypt.compare(password, user?.password!);

            if(!isMatch) {
                return res.status(400).json({message: 'Invalid Passowrd!'});
            }

            if(!user.emailVerified) {
                const otp = crypto.randomInt(100000, 1000000).toString();

                const {subject, html} = emailTemplate.otpEmail(otp);

                const mailService = new MailService();

                await mailService.sendMail(user?.email!, subject, "", html);

                const otpSaved = await UserService.saveOtp({email: user?.email!, otpCode: otp}); 

                return res.status(400).json({message: 'User not verified, otp sent for verification'});
            }

            return res.status(200).json({message: 'Logged in successfully!', data: user});
        } catch(error) {
            return res.status(500).json({message: 'Something went wrong!', error: error});
        }
    }

    static async signup(req: Request, res: Response) {
        try {
            const {email, password, name, role} = req?.body;

            if(!email || !password || !name) {
                return res.status(400).json({message: 'email or password or name is required!'})
            }

            const exists = await UserService.verifyEmail({email: email});

            if(exists) {
                return res.status(400).json({message: 'Email Already Exists!'});
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await UserService.saveUser({email: email, password: hashedPassword, name: name, role: (role ?? "customer")});

            const otp = crypto.randomInt(100000, 1000000).toString();

            const {subject, html} = emailTemplate.otpEmail(otp);

            const mailService = new MailService();

            await mailService.sendMail(user?.email!, subject, "", html);

            const otpSaved = await UserService.saveOtp({email: user?.email!, otpCode: otp}); 

            return res.status(200).json({message: 'Otp will expire in 5 minutes.', data: user});
        } catch(error) {
            return res.status(500).json({message: 'Something went wrong!', error: error})
        }
    }
    
    static async verify(req: Request, res: Response) {
        try {
            const {email, otp} = req.body;

            if(email || otp) {
                return res.status(400).json({message: "Email and Otp should not be empty!"});
            }

            const exists = await UserService.verifyEmail({email: email});

            if(!exists) {
                return res.status(400).json({message: "User don't exists!"});
            }

            const otpExists = await UserService.verifyOtp({email: email});

            if(!otpExists) {
                return res.status(400).json({message: "Otp Invalid!"});
            }

            if(otpExists.token !== otp) {
                return res.status(400).json({message: "Wrong Otp!"});
            }
            const {subject, html} = emailTemplate.welcomeEmail(exists?.name!);

            const mailService = new MailService();

            await mailService.sendMail(exists?.email!, subject, "", html);
            
            return res.status(200).json({message: "User Verified", data: exists});
        } catch(error) {
            return res.status(500).json({message: "Something went wrong!", error});
        }
    }

    static async forgotPassword(req: Request, res: Response) {
        try {
            const {email} = req.body;

            if(!email) {
                return res.status(400).json({message: "Email should not be empty!"});
            }

            const user = await UserService.verifyEmail({email: email});

            if(!user) {
                return res.status(400).json({message: "User not found!"});
            }

            const navLink = `${process.env.FE_BASE_URL}/reset-password`

            const {subject, html} = emailTemplate.resetPasswordEmail(navLink);

            const mailService = new MailService();

            await mailService.sendMail(user?.email!, subject, "", html);

            return res.status(200).json({message: "Reset link sent to your mail"});
            
        } catch(error) {
            return res.status(500).json({message: "Something went wrong!"});
        }
    }

    static async resetPassword(req: Request, res: Response) {
        try {
            const {email} = req.body;

            if(!email) {
                return res.status(400).json({message: "Email or Password is Required!"});
            }

            const user = await UserService.verifyEmail({email: email});

            if(!user) {
                return res.status(400).json({message: "User not found!"});
            }

            const verified = await UserService.emailVerified({email: email});

            const {subject, html} = emailTemplate.passwordResetConfirmationEmail();

            const mailService = new MailService();

            await mailService.sendMail(user?.email!, subject, "", html);

            return res.status(200).json({message: "Password had been reset"});
        } catch(error) {
            return res.status(500).json({message: "Something went wrong!"})
        }
    }
}