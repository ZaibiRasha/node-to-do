import { Model, DataTypes } from 'sequelize';
import  sequelize  from '.';

class Todo extends Model {
  public id!: number;
  public title!: string;
  public description!: string | null;
  public done!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(256),
      allowNull: true,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'todos',
    sequelize,
  }
);

export default Todo;
