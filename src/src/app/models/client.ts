import { BaseEntity } from './baseEntity';
export class Client extends BaseEntity {
  firstName: string;
  lastName: string;
  nationalID: string;
  mobileNumber: string;
}
