"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const PostCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()
  const handleProfileClick = () => {
    console.log(post)
    if (post.creator._id === session?.user.id) return router.push("/profile")
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }
  return (
    <div key={post._id} className="container mt-3 border">
      <div className="post_card p-3">
        <div className="post_card_creator flex justify-between gap-2">
          <div className="flex gap-2" onClick={handleProfileClick}>
            {post.creator.image ? (
              <Image src={post.creator.image} width={45} height={45} alt="creator_image" className="rounded-full object-contan border cursor-pointer" />
            ):(
              <AccountCircleIcon className="rounded-full object-contan border cursor-pointer" />
            )}
            <div className="post_card_creator_username flex flex-col cursor-pointer">
              <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
              <p className="font-inter text-sm text-gray-400">{post.creator.email}</p>
            </div>
          </div>
          {session?.user.id === post.creator._id && pathName === "/profile" && (
            <div className="flex gap-2">
              <p className="edit_btn" onClick={handleEdit}>Edit</p>
              <p className="delete_btn" onClick={handleDelete}>Delete</p>
            </div>
          )}
        </div>
        <div className="post_card_content">
          <p className="my-2 font-inter text-sm cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>
          {post.imageUrl && (
            <div className="w-full h-auto relative">
              <Image src={post.imageUrl} alt="image"width={750} height={300} />
            </div>
          )}
          <p className="mt-2 font-satoshi text-lg text-gray-600">{post.content}</p>
        </div>
      </div>
    </div>
  )
}
export default PostCard