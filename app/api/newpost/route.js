import Post from "@/models/entry"
import { connectToDB } from "@/utils/database"

export const GET = async (request) => {
  try {
    await connectToDB()
    const posts = await Post.find({}).populate("creator")
    return new Response(JSON.stringify(posts), { status: 200 })
  }
  catch(error) {
    console.log(error)
    return new Response("Failed to fetch posts", { status: 500 })
  }
}