import Post from "@/models/entry"
import { connectToDB } from "@/utils/database"

export const POST = async (req) => {
  const { userId, tag, imageUrl, publicId, content } = await req.json()
  try {
    await connectToDB()
    const newPost = new Post({
      creator: userId,
      tag,
      imageUrl,
      publicId,
      content
    })
    await newPost.save()
    return new Response(JSON.stringify(newPost), { status: 201 })
  }
  catch (error) {
    return new Response("Failed to create new post..!", { status: 500 })
  }
}