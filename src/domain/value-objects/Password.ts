import { DomainInvalidValueException } from "../exceptions/Domain-invalid-values.exception";
import { HashProvider } from "../../application/providers/hash.provider";
export class Password {
    private readonly password: string;

    private constructor(password: string) {
        this.password = password;
    }

    public static create(rawPassword: string, hashProvider: HashProvider) {
        if(this.validate(rawPassword)) throw new DomainInvalidValueException("Senha deve ser maior que 6 caracteres!");

        //Mudar isso aqui!!
        const hashedPassword = hashProvider.encrypt(rawPassword);

        return new Password(hashedPassword);
    }

    private static validate(rawPassword: string){
        if(rawPassword.length <= 6) return false

        return true;
    }
}