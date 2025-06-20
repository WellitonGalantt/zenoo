import { DomainInvalidValueException } from '../../exceptions/Domain-invalid-values.exception';
import { Description } from '../Description.vo';

describe('Description value-object tests', () => {
    it('Valid description value', () => {
        const validDescription = 'description';
        const description = Description.create(validDescription);

        expect(description).toBeInstanceOf(Description);
        expect(description.equals(validDescription)).toBe(true);
    });

    it('Invalid description value', () => {
        const invalidDescription = 'test';

        expect(() => {
            const description = Description.create(invalidDescription);
        }).toThrow(DomainInvalidValueException);
    });
})