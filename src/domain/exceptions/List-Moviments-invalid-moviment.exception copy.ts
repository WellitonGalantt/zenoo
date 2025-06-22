export class ListMovimentsInvalidMoviment extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ListMovimentsInvalidMoviment';
    }
}
