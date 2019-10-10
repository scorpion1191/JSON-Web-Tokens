
import { Table, Column, Model, DataType, BeforeCreate, BeforeUpdate, UpdatedAt } from 'sequelize-typescript';

@Table({
    timestamps: false,
    freezeTableName: true,
    schema: 'Public',
    tableName: 'users'
})

export class Users extends Model<Users> {
    @Column({ type:DataType.INTEGER, primaryKey: true})
    userid: number;
    @Column(DataType.TEXT)
    username: string;
    @Column(DataType.TEXT)
    email: string;
    @Column(DataType.TEXT)
    password: string;
    @Column(DataType.TEXT)
    usertype: string;
    @Column({ type: DataType.STRING,defaultValue: DataType.UUIDV4 })
    id: string;
    @Column(DataType.TEXT)
    createdat: string;
    @Column(DataType.TEXT)
    updatedat: string;

    @BeforeUpdate
    static setAuditFieldsOnUpdate(instance: Users) {
        instance.updatedat=(new Date()).toString();

    }
    // this will also be called when an instance is created
    @BeforeCreate
    static setAuditFieldsOnCreate(instance: Users) {

        instance.createdat=(new Date()).toString();
        instance.updatedat=(new Date()).toString();

    }
}