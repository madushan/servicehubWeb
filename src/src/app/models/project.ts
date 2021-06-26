import { BaseEntity } from './baseEntity';
import { Consumer, Skill } from '.';
export class Project extends BaseEntity{
    title:string;
    description:string;
    estimatedTimeEffort:number;
    requiredSkills:Skill[];
    requiredExpertiseLevel:string;
    estimatedBudget:number;
    category:string;
    consumerId:number;
    consumer:Consumer;
}
