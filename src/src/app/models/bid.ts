import { BaseEntity } from "./baseEntity";
export class Bid extends BaseEntity {
  constructor(
    description: string = '',
    price: number = 0,
    projectId: number = 0,
    providerId: number = 0
  ) { super(); }
}
