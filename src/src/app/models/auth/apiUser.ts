import { LoginUserDTO } from "./loginUserDTO";

export class ApiUser {
  userName: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roles: string[];
  /**
   *
   */
  constructor() {
    this.roles = [];
  }
}
