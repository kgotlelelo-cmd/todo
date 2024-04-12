import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';
import { Is } from '@sequelize/validator.js';

export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {

    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>

    @Attribute(DataTypes.STRING)
    @NotNull
    declare description: string

    @Attribute(DataTypes.STRING)
    @NotNull
    @Is(/^(IN_PROGRESS|COMPLETED)$/i)
    declare status: string

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare ownerId: number;
}