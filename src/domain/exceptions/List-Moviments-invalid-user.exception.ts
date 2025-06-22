export class ListMovimentsInvalidUser extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ListMovimentsInvalidUser';
    }
}
