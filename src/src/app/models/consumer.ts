import { BaseEntity } from "./baseEntity";
import { Contact,UserArea,SocialMedia,Project,Agreement } from '.';

export class Consumer extends BaseEntity {
    name:string;
    address:string;
    identityPhoto:string;
    contacts:Contact[];
    consumerAreas:UserArea[];
    socialMedias:SocialMedia[];
    projects:Project[];
    agreements:Agreement[];
}
