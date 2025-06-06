export interface HashProvider {
    encrypt(rawPassword: string): string
    verifyHash(hashedPassword: string, rawPassword: string): boolean
}