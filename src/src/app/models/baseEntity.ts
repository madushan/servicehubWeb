export class BaseEntity {
  id: number;
  isActive: boolean;
  stage: string;
  constructor() {
    this.isActive = true;
    this.stage = '';
  }
}
