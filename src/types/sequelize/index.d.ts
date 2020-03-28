import { Model, BuildOptions } from 'sequelize';

// https://sequelize.org/master/manual/typescript.html

// We need to declare an interface for our model that is basically what our class would be
export interface ModelSequelizeInterface extends Model {
  // eslint-disable-next-line max-len
  belongsTo(model: ModelSequelizeInterface, options: object);
  hasOne(model: ModelSequelizeInterface, options: object);
  hasMany(model: ModelSequelizeInterface, options: object);
}

// Need to declare the static model so `findOne` etc. use correct types.
export type ModelSequelizeInterfaceStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): ModelSequelizeInterface;
  associate(models: Record<string, ModelSequelizeInterface>): void;
}
