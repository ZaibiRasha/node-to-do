import { Table, Column, Model, DataType, AllowNull, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'todos' })
export class Todo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id!: number;

  @AllowNull(false)
  @Column({
    type : DataType.STRING
  })  
  title!: string;

  @AllowNull(false)
  @Column({
    type : DataType.STRING
  }) 
  description!: string;
  
  @AllowNull(false)
  @Column({
    type : DataType.BOOLEAN
  })
  done!: boolean ;
}