import { HydratedDocument } from "mongoose"
import { ReviewSchema } from "../schema/review.schema"

declare global {
    type REVIEW_MODEL = HydratedDocument<ReviewSchema>
}

export {}