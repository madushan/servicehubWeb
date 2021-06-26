import { Provider } from ".";
import { BaseEntity } from "./baseEntity";

export class Portfolio extends BaseEntity {
  title:string;
  description:string;
  providerId:number;
  provider:Provider;
}
