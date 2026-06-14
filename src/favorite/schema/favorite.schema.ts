import { Prop, Schema } from "@nestjs/mongoose";

@Schema({
    timestamps : true,
    collection : "FavoriteCultureInfo"
})

export class FavoriteCultureInfoSchema {
  @Prop()
  favoriterId : string;
  
  @Prop()
  exhibitionImg: string;

  @Prop()
  exhibitionTitle: string;

  @Prop()
  exhibitionStartDate: string;

  @Prop()
  exhibitionEndDate: string;

  @Prop()
  exhibitionSeq : string;

  @Prop()
  exhibitionType : SERVICE_TYPE;

  @Prop()
  exhibitionArea : DISTRICT
}