import { HydratedDocument } from "mongoose"
import { FavoriteExhibitionSchema } from "../../favorite/schema/favorite.schema"

declare global {
    type FAVORITE_EXHIBITION_MODEL = HydratedDocument<FavoriteExhibitionSchema>;
}

export {}