import { BaseEntity } from "./baseEntity";
import { Contact, UserArea, SocialMedia, Project, Agreement, User } from '.';

export class Consumer extends BaseEntity {
  constructor(
    public userId: number = 0,
    public user: User = null,
    public projects: Project[] = []
  ) { super(); }
  // name:string;
  // address:string;
  // identityPhoto:string;
  // contacts:Contact[];
  // consumerAreas:UserArea[];
  // socialMedias:SocialMedia[];
  // agreements: Agreement[];
}
