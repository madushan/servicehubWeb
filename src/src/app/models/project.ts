import { BaseEntity } from './baseEntity';
import {  ProjectCategory, Skill, User } from '.';
import { Agreement } from './agreement';
export class Project extends BaseEntity {
  constructor(
    public title: string = '',
    public description: string = '',
    public estimatedTimeEffort: number = 0,
    public requiredSkills: Skill[] = [],
    public requiredExpertiseLevel: string = '',
    public estimatedBudget: number = 0,
    public category: string = '',
    public consumerId: number = 1,
    public consumer: User = null,
    public projectCategory:ProjectCategory = null,
    public projectCategoryId: number = 0,
    public agreementId: number = 0,
    public agreement:Agreement = null
  ) { super() }
}
//project published time
