import { StatusUser } from 'src/core/utils/user-status';
import { Role } from '../../../../core/utils/roles';

export class CreateUserInput {
  username: string;

  email: string;

  password: string;

  phone: string;

  status?: StatusUser;

  roles?: Role[];
}
