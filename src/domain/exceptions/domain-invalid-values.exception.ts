export class DomainInvalidValueException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DomainInvalidValueException';
    }
}
