import { Password } from '../Password';

describe('Password value-object tests', () => {
    it('Valid password value', () => {
        const validPassword = 'senhatop123';
        const password = Password.create(validPassword);

        expect(password).toBeInstanceOf(Password);
    });
});
