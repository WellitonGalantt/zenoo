export abstract class Entity<Props> {
    public readonly id?: number;
    protected props: Props;

    protected constructor(props: Props, id?: number) {
        this.id = id;
        this.props = props;
    }

    get _id(): number | undefined {
        return this.id;
    }

    // Comparacao das entidades por id;
    public equals(objetct?: Entity<Props>): boolean {
        // antes de verificar os id ele verifica se realmente tem um objeto valido
        if (objetct === null || objetct === undefined) {
            return false;
        }

        if (this === objetct) {
            return true;
        }

        if (!(objetct instanceof Entity)) {
            return false;
        }

        return this.id === objetct.id;
    }
}
