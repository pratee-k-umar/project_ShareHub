"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@/components/Profile"

export default function MyProfile() {
  const router = useRouter()
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/post`)
      const data = await response.json()
      setPosts(data)
    }
    if(session?.user.id) fetchPosts()
  }, [session])
  const handleEdit = (post) => {
    router.push(`/edit-post?id=${post._id}`)
  }
  const deleteImage = async (publicId) => {
    const res = await fetch("/api/removeImage", {
      method: "POST",
      body: JSON.stringify({ publicId })
    })
  }
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure..?")
    if(hasConfirmed) {
      try {
        if(post.publicId) await deleteImage(post.publicId)
        const res = await fetch(`/api/newpost/${post._id.toString()}`, {
          method: "DELETE"
        })
        if(res.ok) router.refresh()
        const filteredPost = posts.filter((p) => p._id !== post._id)
        setPosts(filteredPost)
      }
      catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className="w-full sm:w-1/2 mx-auto">
      <div className="profile_post_list">
        <Profile name="My" data={posts} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  )
}
