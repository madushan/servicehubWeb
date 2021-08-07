export class BaseEntity {
  id: number;
  isActive: boolean;
  stage: string;
  status: string;
  constructor() {
    this.isActive = true;
    this.stage = '';
    this.status = '';
  }
}
