import { Prop, Schema } from "@nestjs/mongoose";

@Schema({
    timestamps : true,
    collection : "Review"
})

export class ReviewSchema {
  @Prop()
  writerId : string;

  @Prop()
  seq : string;

  @Prop()
  contents : string;

  createdAt: Date;
  updatedAt: Date;
}