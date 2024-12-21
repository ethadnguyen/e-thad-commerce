import { Role } from '../../../../core/utils/roles';

export interface CustomerPayload {
  id: number;
  name: string;
  roles: Role[];
}
