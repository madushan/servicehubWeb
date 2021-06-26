import { Agreement, Contact,Education,Portfolio,Skill,SocialMedia,UserArea } from '.';
import { BaseEntity } from './baseEntity';


export class Provider extends BaseEntity {
    name:string;
    address:string;
    identityPhoto:string;
    contacts:Contact[];
    servingAreas:UserArea[];
    socialMedias:SocialMedia[];
    profilePhoto:string;
    providerIntroduction:string;
    skills:Skill[];
    expertiseLevel:string;
    portfolios:Portfolio[];
    educations:Education[];
    currentEmployment:string;
    hourlyRate:number;
    agreements:Agreement[];
}
