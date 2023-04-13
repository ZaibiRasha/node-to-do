import { Model, DataTypes } from 'sequelize';
import sequelize  from '../config/database';

class Session extends Model {
  public sid!: string;
  public expires!: Date;
  public data!: string;
}

Session.init(
  {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'sessions',
    sequelize,
  }
);

export default Session;
