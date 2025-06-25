export class MovimentsFailedOparation extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MovimentsFailedOparation';
    }
}
