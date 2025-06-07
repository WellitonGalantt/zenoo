import { DomainInvalidValueException } from '../../exceptions/Domain-invalid-values.exception';
import { Email } from '../Email';

describe('Email value-object test', () => {
    it('Cerate valid email', () => {
        const validEmail = 'emailteste@gmail.com';

        const email = Email.create(validEmail);

        expect(email).toBeInstanceOf(Email);
        expect(email.equals(validEmail)).toBe(true);
    });

    it('Create invalid email', () => {
        const invalidEmail = 'emailteste.com';

        expect(() => {
            const email = Email.create(invalidEmail);
        }).toThrow(DomainInvalidValueException);
    });
});
