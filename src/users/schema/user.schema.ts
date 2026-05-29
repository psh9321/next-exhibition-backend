import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
    timestamps : true,
    collection : "Users"
})
export class UsersSchema {
  @Prop()
  name: string;

  @Prop()
  id: string;

  @Prop()
  type: string;

  @Prop({ default : false })
  isProfileImg : boolean;
}
