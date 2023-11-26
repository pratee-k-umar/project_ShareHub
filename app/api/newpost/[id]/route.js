import Post from "@/models/entry"
import { connectToDB } from "@/utils/database"

export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    const posts = await Post.findById(params.id).populate("creator")
    if(!posts) return new Response("No Posts yet..!", { status: 404 })
    return new Response(JSON.stringify(posts), { status: 200 })
  }
  catch(error) {
    return new Response("Failed to fetch posts", { status: 500 })
  }
}

export const PATCH = async (request, { params }) => {
  const { tag, imageUrl, publicId, content } = await request.json()
  try {
    await connectToDB()
    const exsistingPosts = await Post.findById(params.id)
    if(!exsistingPosts) return new Response("No posts yet..!", { status: 404 })
    exsistingPosts.tag = tag
    exsistingPosts.imageUrl = imageUrl
    exsistingPosts.publicId = publicId
    exsistingPosts.content = content
    await exsistingPosts.save()
    return new Response(JSON.stringify(exsistingPosts), { status: 200 })
  }
  catch(error) {
    return new Response("Failed to update post..!", { status: 500 })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()
    await Post.findByIdAndDelete(params.id)
    return new Response("Post deleted successfully...", { status: 200 })
  }
  catch (error) {
    return new Response("Failed to delete post..!", { status: 500 })
  }
}