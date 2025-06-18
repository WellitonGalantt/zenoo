import { AuthProvider } from "../../../application/providers/auth.provider";
import dotenv from 'dotenv';
import jwt, { JwtPayload } from "jsonwebtoken";
import { AutheticationFailedException } from "../../../domain/exceptions/Authetication-failed.exception";

dotenv.config()

export class IAuthProvider implements AuthProvider {

    public generateToken(userId: number, role: string): string {
        const secret = process.env.JWTASIGN;

        if (!secret) {
            throw new AutheticationFailedException('Not Found Secret Key!!');
        }

        return jwt.sign({ userId: userId, role: role }, secret, { expiresIn: '30m' })
    }

    public validate(token: string): JwtPayload {

        const secret = process.env.JWTASIGN;

        if (!secret) {
            throw new AutheticationFailedException('Not Found Secret Key!!');
        }
        const verifyToken = jwt.verify(token, secret);

        if(typeof(verifyToken) === 'string' ){
            throw new AutheticationFailedException('Invalid Token!');
        }

        return verifyToken;
    }
}