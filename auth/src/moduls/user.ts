import mongoose from "mongoose";
import { Password } from "../utils/password";
interface UserAtters {
     email: string;
     password: string;
     firstName: string;
     lastName: string;
}

export interface UserDoc extends mongoose.Document {
     email: string;
     password: string;
     firstName: string;
     lastName: string;
}

interface UserModal extends mongoose.Model<UserDoc> {
     build(attrs: UserAtters): any;
}

const UserSchama = new mongoose.Schema(
     {
          email: {
               required: true,
               type: String,
          },
          password: {
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
     },
     {
          toJSON: {
               transform: (doc, ret) => {
                    ret.id = ret._id;
                    delete ret._id;
                    delete ret.password;
                    delete ret.__v;
               },
          },
     }
);

UserSchama.statics.build = (attrs: UserAtters) => {
     return new User(attrs);
};
UserSchama.pre("save", async function (done) {
     if (this.isModified("password")) {
          const hashed = await Password.toHash(this.get("password"));
          this.set("password", hashed);
     }
     done();
});
const User = mongoose.model<UserDoc, UserModal>("Users", UserSchama);

export default User;
