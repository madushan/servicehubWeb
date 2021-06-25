import { BaseEntity } from "./baseEntity";
import { Contact,UserArea,SocialMedia,Project,Agreement } from './../models';

export class Consumer extends BaseEntity {
    name:string;
    address:string;
    identityPhoto:string;
    contacts:Contact[];
    consumerAreas:Consumer[];
    socialMedias:SocialMedia[];
    projects:Project[];
    agreements:Agreement[];
}
