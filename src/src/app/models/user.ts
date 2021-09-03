import { BaseEntity } from "./baseEntity";
import { Contact, UserArea, SocialMedia, Project, Agreement, Education, Portfolio, Skill } from '.';
export class User extends BaseEntity {
  constructor(
    public name: string = '',
    public address: string = '',
    public identityPhoto: string = '',
    public contacts: Contact[] = [],
    public userAreas: UserArea[] = [],
    public socialMedias: SocialMedia[] = [],
    //provider
    public providerIntroduction: string = '',
    public skills: Skill[] = [],
    public expertiseLevel: string = '',
    public portfolios: Portfolio[] = [],
    public educations: Education[] = [],
    public currentEmployment: string = '',
    public hourlyRate: number = 0,
    public agreements: Agreement[] = [],
    //consumer
    public projects: Project[] = []
    //public consumerId: number = 0,
    //public consumer: Consumer = null,
    //public providerId: number = 0,
    //public provider: Provider = null
    // public projects: Project[] = [],
    // public agreements: Agreement[] = []
  ) { super(); }

}
