import { BaseEntity } from "./baseEntity";
import { Contact, UserArea, SocialMedia, Project, Agreement, Consumer, Provider } from '.';
export class User extends BaseEntity {
  constructor(
    public name: string = '',
    public address: string = '',
    public identityPhoto: string = '',
    public contacts: Contact[] = [],
    public userAreas: UserArea[] = [],
    public socialMedias: SocialMedia[] = [],
    public consumerId: number = 0,
    public consumer: Consumer = null,
    public providerId: number = 0,
    public provider: Provider = null
    // public projects: Project[] = [],
    // public agreements: Agreement[] = []
  ) { super(); }

}
