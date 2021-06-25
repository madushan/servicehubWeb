import { BaseEntity } from './baseEntity';
import { Provider,Consumer,Project } from './../models';

export class Agreement extends BaseEntity {
  startDate: Date;
  endDate: Date;
  providerId:number;
  provider:Provider;
  consumerId:number;
  consumer:Consumer;
  projectId:number;
  project:Project;
}
