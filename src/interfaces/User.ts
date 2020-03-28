export interface UserInterface {
  id: string;
  email: string;
  password?: Buffer;
}

export interface UserInputDTOInterface {
  email: string;
  password: string;
}
