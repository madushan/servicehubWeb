import { BaseEntity } from './baseEntity';
import { User } from './user';
export class Advertisement extends BaseEntity {
  title: string;
  content: string;
  providerId:number;
  provider:User;
}
