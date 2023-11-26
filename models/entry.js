import { Schema, model, models } from "mongoose"

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  tag: {
    type: String,
    required: [true, "Tag not specified..!"]
  },
  imageUrl: {
    type: String
  },
  publicId: {
    type: String
  },
  content: {
    type: String,
    required: [true, "Content cannot be empty..!"]
  },
})

const Post = models.Post || model("Post", PostSchema)
export default Post