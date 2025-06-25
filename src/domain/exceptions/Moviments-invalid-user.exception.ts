export class MovimentsInvalidUser extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MovimentsInvalidUser';
    }
}
