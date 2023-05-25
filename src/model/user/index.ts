export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface RegisteredUser extends User{
  password: string;
  birthdayDate: string;
  sex: 'male' | 'female';
}
