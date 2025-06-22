import { DomainInvalidValueException } from '../../exceptions/Domain-invalid-values.exception';
import { Title } from '../Title.vo';

describe('Title value-object tests', () => {
    it('Valid title value', () => {
        const validTitle = 'title';
        const title = Title.create(validTitle);

        expect(title).toBeInstanceOf(Title);
        expect(title.equals(validTitle)).toBe(true);
    });

    it('Invalid title with minor 3 char value', () => {
        const invalidTitle = 'oie';

        expect(() => {
            const title = Title.create(invalidTitle);
        }).toThrow(DomainInvalidValueException);
    });

    it('Invalid title with greater 25 char value', () => {
        const invalidTitle = 'Tiulo muit grande para colocar';

        expect(() => {
            const title = Title.create(invalidTitle);
        }).toThrow(DomainInvalidValueException);
    });
});
