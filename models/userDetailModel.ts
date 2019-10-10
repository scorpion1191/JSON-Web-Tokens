
import { Table, Column, Model, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';

@Table({
    timestamps: false,
    freezeTableName: true,
    schema: 'PUBLIC',
    tableName: 'userdetail'
})

export class Userdetail extends Model<Userdetail> {
    @Column({ type: DataType.INTEGER, primaryKey: true})
    USERID: number;
    @Column(DataType.STRING)
    FIRSTNAME: string;
    @Column(DataType.STRING)
    LASTNAME: string;
    @Column(DataType.STRING)
    EMAIL: string;
    @Column(DataType.STRING)
    DOB: string;
    @Column(DataType.STRING)
    ADDRESS: string;
    @Column({ type: DataType.STRING,defaultValue: DataType.UUIDV4 })
    id: string;
    @Column(DataType.TEXT)
    createdat: string;
    @Column(DataType.TEXT)
    updatedat: string;

    @BeforeUpdate
    static setAuditFieldsOnUpdate(instance: Userdetail) {
        instance.updatedat=(new Date()).toString();

    }
    // this will also be called when an instance is created
    @BeforeCreate
    static setAuditFieldsOnCreate(instance: Userdetail) {

        instance.createdat=(new Date()).toString();
        instance.updatedat=(new Date()).toString();

    }
}
