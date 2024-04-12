import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, HasManyRemoveAssociationMixin } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Unique, HasMany } from '@sequelize/core/decorators-legacy';
import { IsEmail } from '@sequelize/validator.js';
import { Task } from './task';


export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    declare firstName: string | null;

    @Attribute(DataTypes.STRING)
    declare lastName: string | null;

    @Attribute(DataTypes.STRING)
    @NotNull
    @Unique
    @IsEmail
    declare email: string

    @HasMany(() => Task, 'ownerId')
    declare tasks?: NonAttribute<Task[]>;

    declare getTasks: HasManyGetAssociationsMixin<Task>;

    declare createTask: HasManyCreateAssociationMixin<Task, 'ownerId'>;

    declare removeTask: HasManyRemoveAssociationMixin<Task, Task['id']>;
}