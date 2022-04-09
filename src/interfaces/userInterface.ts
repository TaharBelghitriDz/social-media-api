export interface userSignUp {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  checkPassword: string;
}

export interface userLogin {
  email: string;
  password: string;
}

export interface checkUserInterface {
  token: string;
  email: string;
}
