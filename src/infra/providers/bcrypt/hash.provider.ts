import { HashProvider } from '../../../application/providers/hash.provider';
import bcrypt from 'bcrypt';

export class IHashProvider implements HashProvider {
    private readonly saltRounds: number = 8;

    public async encrypt(rawPassword: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(rawPassword, this.saltRounds);

        return hashedPassword;
    }

    public async verifyHash(hashedPassword: string, rawPassword: string): Promise<boolean> {
        return await bcrypt.compare(rawPassword, hashedPassword);
    }
}
