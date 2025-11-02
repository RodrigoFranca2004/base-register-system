import mongoose, {Schema, model, Document} from "mongoose"

export interface IClientDocument extends Document {
    _id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}

const ClientSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const ClientModel = model<IClientDocument>("Client", ClientSchema);