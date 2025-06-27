export class UpdateMovimentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UpdateMovimentError';
    }
}
