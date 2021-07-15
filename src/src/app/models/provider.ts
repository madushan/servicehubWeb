import { Agreement, Contact, Education, Portfolio, Skill, SocialMedia, User, UserArea } from '.';
import { BaseEntity } from './baseEntity';


export class Provider extends BaseEntity {
  constructor(
    public providerIntroduction: string = '',
    public skills: Skill[] = [],
    public expertiseLevel: string = '',
    public portfolios: Portfolio[] = [],
    public educations: Education[] = [],
    public currentEmployment: string = '',
    public hourlyRate: number = 0,
    public agreements: Agreement[] = [],
    public userId: number = 0,
    public user: User = null
  ) { super(); }
  // name:string;
  // address:string;
  // identityPhoto:string;
  // contacts:Contact[];
  // servingAreas:UserArea[];
  // socialMedias:SocialMedia[];
  // profilePhoto:string;

}
