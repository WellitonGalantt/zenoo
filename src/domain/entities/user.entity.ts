// Entidade para usuario

import { DomainInvalidValueException } from "../exceptions/domain-invalid-values.exception";

type UserProps = {
  id: number | undefined;
  name: string;
  email: string;
  password: string;
  created_at: Date;
};

export class UserEntity {
  private constructor(private props: UserProps) {}

  public static createUserEntity(data: UserProps): UserEntity {
    const { id, name, email, password, created_at } = data;

    if (name.length <= 3) {
        throw new DomainInvalidValueException("Nome deve ser maior que 3 caracteres!");
    }

    if(){
        
    }

    return new UserEntity(data);
  }
}
