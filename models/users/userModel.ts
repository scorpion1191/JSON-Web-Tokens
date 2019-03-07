import { Document, Schema, Model, model} from "mongoose";
import { IUser } from "./userInterface";

export interface IUserModel extends IUser, Document {
    fullName(): string;
}

export var UserSchema: Schema = new Schema({
        email: {
            required: true,
            type: String,
        },
        firstName: {
            required: true,
            type: String,
        },
        lastName: {
            required: true,
            type: String,
        },
        password:{
            required:true,
            type: String
        },
        userType:{
            required:true,
            type:String
        }
    },{
        timestamps: true,
    });
  
  UserSchema.methods.fullName = () => {
    return (this.firstName.trim() + " " + this.lastName.trim());
  };

  export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);