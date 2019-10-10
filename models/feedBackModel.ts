/**
 * @ngdoc model
 * @name BookMarkLabel
 * @description
 * Domain model class for storing BookMarkLabels
 */
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    BeforeCreate,
    BeforeUpdate,
    HasMany
} from 'sequelize-typescript';
import {Userdetail} from "./userDetailModel";


@Table({
    timestamps: false,
    freezeTableName: true,
    schema: 'PUBLIC',
    tableName: 'feedback'
})


export class Feedback extends Model<Feedback> {
    @Column({ type: DataType.STRING, primaryKey: true,defaultValue: DataType.UUIDV4 })
    ID: string;

    @Column(DataType.INTEGER)
    RECEIVERID: Number;

    @Column(DataType.INTEGER)
    PROVIDERID: Number;

    @Column(DataType.STRING)
    FEEDBACK: string;

    @Column(DataType.STRING)
    createdat: string;

    @Column(DataType.STRING)
    updatedat: string;

    @BeforeUpdate
    static setAuditFieldsOnUpdate(instance: Feedback) {
        instance.updatedat=(new Date()).toString();

    }
    // this will also be called when an instance is created
    @BeforeCreate
    static setAuditFieldsOnCreate(instance: Feedback) {

        instance.createdat=(new Date()).toString();
        instance.updatedat=(new Date()).toString();

    }
}