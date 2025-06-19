import { DomainInvalidValueException } from "../exceptions/Domain-invalid-values.exception";

export class Title {
    public readonly title: string

    private constructor(value: string) {
        this.title = value;
    }

    public static create(value: string): Title {

        if (!this.validade(value)) {
            throw new DomainInvalidValueException(
                'Invalid Title! Title must be greater than 3 characters and minor than 24 characters.',
            );
        }
        return new Title(value);
    }

    public equals(otherTitle: string): boolean {
        return this.title === otherTitle;
    }

    private static validade(title: string): boolean {
        if (title.length <= 3 || title.length > 24) return false;
        return true;
    }
}