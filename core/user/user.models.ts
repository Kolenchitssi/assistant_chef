export enum UserKeys {
  userID = 'userID',
  firstName = 'firstName',
  secondName = 'secondName',
  email = 'email',
  phone = 'phone',
  nickName = 'nickName',
  role = 'role',
  sex = 'sex',
  favorites = 'favorites',
  ownRecipes = 'ownRecipes',
}

export interface IUser {
  [UserKeys.userID]: string;
  [UserKeys.firstName]: string;
  [UserKeys.secondName]: string;
  [UserKeys.email]: string;
  [UserKeys.phone]: string;
  [UserKeys.nickName]: string;
  [UserKeys.role]: 'user' | 'admin';
  [UserKeys.sex]: 'male' | 'female';
  [UserKeys.favorites]: string[];
  [UserKeys.ownRecipes]: string[];
}
