export class AutheticationFailedException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AutheticationFailedException';
    }
}
