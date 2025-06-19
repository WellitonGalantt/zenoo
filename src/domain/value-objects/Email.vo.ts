import { DomainInvalidValueException } from '../exceptions/Domain-invalid-values.exception';

export class Email {
    //Trocando para public para poder acessar no repositorio que precisa do valor raiz/primitivo;
    public readonly email: string;

    private constructor(email: string) {
        this.email = email;
    }

    public static create(email: string): Email {
        if (!this.validate(email)) {
            throw new DomainInvalidValueException('Formato de email invalido!!');
        }

        return new Email(email);
    }

    public equals(otherEmail: string): boolean {
        return this.email === otherEmail;
    }

    private static validate(email: string): boolean {
        if (!email) {
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
