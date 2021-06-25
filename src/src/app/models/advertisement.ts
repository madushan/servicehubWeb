import { BaseEntity } from './baseEntity';
import { Provider } from './../models';
export class Advertisement extends BaseEntity {
  title: string;
  content: string;
  providerId:number;
  provider:Provider;
}
