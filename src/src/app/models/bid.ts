import { BaseEntity } from "./baseEntity";
export class Bid extends BaseEntity {
  constructor(
    public description: string = '',
    public amount: number = 0,
    public requiredTime: number = 0,
    public providerId: number = 0,
    public projectId:number = 0
  ) { super(); }
}
