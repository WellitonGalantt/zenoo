import { DomainInvalidValueException } from '../../exceptions/Domain-invalid-values.exception';
import { Description } from '../../value-objects/Description.vo';
import { Title } from '../../value-objects/Title.VO';
import { Entity } from '../Entity';

// Enumerate mais performnatico
export const TypesMov = {
    INCOME: 'ganho',
    EXPENSE: 'gasto',
} as const; // Cria um objeto com os valores ao inves das tipagem, sem ele seria INCOME: string e nao INCOME: 'ganho'

export const IsFixedTypeMov = {
    IS_FIXED: 's',
    NOT_FIXED: 'n',
} as const;
// Criando o type de fato usando um objeto
// Essa parte faz a uniao dos tipos, keyof typeof TypesMov essa parte pega os nome Income e Expense
// essa parte TypesMov[keyof typeof TypesMov] adiciona os valores de Income e Expense
// No final fica: TypesMoviment = 'ganho' | 'gasto'
export type TypesMoviment = (typeof TypesMov)[keyof typeof TypesMov];
export type IsFixedTypeMoviment = (typeof IsFixedTypeMov)[keyof typeof IsFixedTypeMov];

export type MovimentProps = {
    id: number;
    title: Title; // criar um value opbject
    short_description: Description; // criar um value object
    value: number;
    is_fixed: string;
    type: string;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    category_id: number;
};

export class MovimentEntity extends Entity<MovimentProps> {
    private constructor(props: MovimentProps, id?: number) {
        super(props, id);
    }

    public static create(props: MovimentProps, id?: number): MovimentEntity {
        let { title, short_description, value, is_fixed, type, created_at, updated_at, user_id, category_id } = props;

        if (value <= 0 || !(typeof value === 'number'))
            throw new DomainInvalidValueException('Invalid Value! Value must be greater than 0 and be a number.');

        if (!MovimentEntity.validateType(type))
            throw new DomainInvalidValueException('Invalid Type! Type must be "ganho" or "gasto".');

        if (!MovimentEntity.validateIsFixed(is_fixed))
            throw new DomainInvalidValueException('Invalid Is Fixed! Is Fixed must be "s" or "n".');

        if (!created_at) {
            created_at = new Date();
        }

        if (!updated_at) {
            updated_at = new Date();
        }

        if (!user_id) throw new DomainInvalidValueException('Invalid User! It is not possible to create without a user!');

        if (!category_id) throw new DomainInvalidValueException('Invalid Category! It is not possible to create without a category!');

        return new MovimentEntity(props, id);
    }

    get title(): string {
        return this.props.title.title;
    }

    get short_description(): string {
        return this.props.short_description.description;
    }

    get value(): number {
        return this.props.value;
    }

    public changeTitle() {

    }

    private static validateType(type: string): boolean {
        // Validando o tipo de movimentacao
        // Verifica de contem o valor passado no enum ou nao, e retorna verdadeiro ou falso
        return Object.values(TypesMov).includes(type as TypesMoviment);
    }

    private static validateIsFixed(is_fixed: string): boolean {
        // Validando se e fixo ou nao
        return Object.values(IsFixedTypeMov).includes(is_fixed as IsFixedTypeMoviment);
    }
}
