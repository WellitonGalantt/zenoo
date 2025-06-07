import { DomainInvalidValueException } from '../exceptions/Domain-invalid-values.exception';
import { HashProvider } from '../../application/providers/hash.provider';
export class Password {
    private readonly password: string;

    private constructor(password: string) {
        this.password = password;
    }

    public static create(hashedPassword: string) {
        if (!this.validate(hashedPassword))
            throw new DomainInvalidValueException('Senha deve ser maior que 6 caracteres!');

        return new Password(hashedPassword);
    }

    private static validate(hashedPassword: string) {
        if (hashedPassword.length <= 6) return false;

        return true;
    }
}
