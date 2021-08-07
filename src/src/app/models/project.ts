import { BaseEntity } from './baseEntity';
import { Consumer, Skill, User } from '.';
export class Project extends BaseEntity {
  constructor(
    public title: string = '',
    public description: string = '',
    public estimatedTimeEffort: number = 0,
    public requiredSkills: Skill[] = [],
    public requiredExpertiseLevel: string = '',
    public estimatedBudget: number = 0,
    public category: string = '',
    //public consumerId: number = 1,
    public consumer: User = null
  ) { super() }
}
//project published time
