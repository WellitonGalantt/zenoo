import { JwtPayload } from 'jsonwebtoken';

export interface AuthProvider {
    generateToken(userId: number, role: string): string;
    validate(token: string): JwtPayload;
}
