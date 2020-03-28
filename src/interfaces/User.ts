import { Model } from 'sequelize';

export interface UserInterface {
  id: string;
  email: string;
  password?: Buffer;
}

export interface UserInputDTOInterface {
  email: string;
  password: string;
}

// https://sequelize.org/master/manual/typescript.html

// We need to declare an interface for our model that is basically what our class would be
export interface UserSequelizeInterface extends Model {
  hasOne(Rating: UserSequelizeInterface);
  hasMany(Comment: UserSequelizeInterface);
}
