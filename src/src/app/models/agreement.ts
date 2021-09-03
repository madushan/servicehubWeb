import { BaseEntity } from './baseEntity';
import { Project, User } from './../models';

export class Agreement extends BaseEntity {
  startDate: Date;
  endDate: Date;
  providerId:number;
  consumerId:number;
  consumer:User;
  projectId:number;
  project:Project;
}
