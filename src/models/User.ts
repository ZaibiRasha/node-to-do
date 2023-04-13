import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import crypto from 'crypto';
 
class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public resetToken!: string | null;
  public resetTokenExpiresAt!: Date | null;

  public generateResetToken(): string {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetToken = resetToken;
    this.resetTokenExpiresAt = new Date(Date.now() + 3600000); // expires in 1 hour
    return resetToken;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    resetToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    resetTokenExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize ,
  }
);

export default User;
