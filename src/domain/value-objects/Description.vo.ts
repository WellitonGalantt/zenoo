import { DomainInvalidValueException } from '../exceptions/Domain-invalid-values.exception';

export class Description {
    public readonly description: string;

    private constructor(value: string) {
        this.description = value;
    }
    public static create(value: string): Description {
        if (!this.validade(value)) {
            throw new DomainInvalidValueException(
                'Invalid Short Description! Short Description must be greater than 3 characters and minor than 122 characters.',
            );
        }
        return new Description(value);
    }

    public equals(otherDescription: string): boolean {
        return this.description === otherDescription;
    }

    private static validade(description: string): boolean {
        if (description.length <= 5 || description.length > 122) return false;
        return true;
    }
}
