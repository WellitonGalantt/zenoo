export interface HashProvider {
    encrypt(rawPassword: string): Promise<string>;
    verifyHash(hashedPassword: string, rawPassword: string): Promise<boolean>;
}
