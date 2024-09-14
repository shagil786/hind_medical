import {User, IUser} from '../schemas/user';;
import { VerificationToken, IVerificationToken } from '../schemas/token';

interface VerifyEmail {
    email: string;
}

interface SavedUser {
    email: string;
    name?: string;
    password: string;
    role?: string
}

interface SaveOtp {
    email: string;
    otpCode: string;
}

interface VerifyOtp {
    email: string;
}

interface EmailVerified {
    email: string;
}

export class UserService {
    static async verifyEmail(payload: VerifyEmail): Promise<IUser | null> {
        const user = await User.findOne({email: payload?.email}).lean();
        return user;
    }

    static async saveUser(payload: SavedUser): Promise<IUser | null> {
        const user = await User.create({email: payload?.email, name: payload?.name, password: payload?.password, role: payload?.role});
        return user;
    }

    static async saveOtp(payload: SaveOtp): Promise<IVerificationToken | null> {
        const expiryTime = new Date();
        expiryTime.setMinutes(expiryTime.getMinutes() + 5);

        const user = await VerificationToken.create({identifier: payload?.email, token: payload.otpCode, expires: expiryTime});
        return user;
    }

    static async verifyOtp(payload: VerifyOtp): Promise<IVerificationToken | null> {
        const user = await VerificationToken.findOne({identifier: payload?.email});
        return user;
    }

    static async emailVerified(payload: EmailVerified): Promise<IUser | null> {
        const user = await User.findOne({email: payload?.email});
        
        if(!user)
            return null;

        user.emailVerified = new Date();

        user.save();
        
        return user;
    }
}