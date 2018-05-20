export interface GardenModel {
  username: string;
  email: string;
  id: string;
}

export default class Garden implements GardenModel {
  public username: string = "";
  public email: string = "";
  public id: string = "";

  constructor(username: string = "", email: string = "", id: string = "") {
    this.username = username;

    this.email = email;
    this.id = id;
  }

  public toJson(): GardenModel {
    return {
      username: this.username,
      email: this.email,
      id: this.id
    };
  }
}
