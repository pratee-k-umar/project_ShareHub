"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import ImageIcon from '@mui/icons-material/Image';
import Image from "next/image";


export default function Prompt() {
  const router = useRouter()
  const { data: session } = useSession()
  const [submiting, setSubmiting] = useState(false);
  const [imageUrl, setImageUrl] = useState("")
  const [publicId, setPublicId] = useState("")
  const [post, setPost] = useState({
    tag: "",
    imageUrl: "",
    publicId: "",
    content: ""
  });
  const type = "Create"
  const createPost = async (e) => {
    e.preventDefault()
    setSubmiting(true)
    try {
      const response = await fetch("/api/newpost/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          tag: post.tag,
          imageUrl: post.imageUrl,
          publicId: post.publicId,
          content: post.content
        })
      })
      if(response.ok) {
        router.push('/profile')
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setSubmiting(false)
    }
  };
  const handleImageUpload = (result) => {
    console.log(result)
    const info = result.info
    if("secure_url" in info && "public_id" in info)  {
      const url = info.secure_url
      const public_id = info.public_id
      setImageUrl(url)
      setPublicId(public_id)
      setPost(post => ({
        ...post,
        imageUrl: url,
        publicId: public_id
      }));
    }
  }
  const removeImage = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/removeImage", {
        method: "POST",
        body: JSON.stringify({ publicId })
      })
      if(res.ok) {
        setImageUrl("")
        setPublicId("")
        setPost(post => ({
          ...post,
          imageUrl: "",
          publicId: ""
        }));
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="mt-3 w-full sm:w-1/2 mx-auto ">
      <form className="mt-16 mx-auto w-3/4 flex flex-col gap-4" onSubmit={createPost}>
        <label className="flex flex-col">
          <h1 className="flex gap-1">
            <span className="text-3xl font-extrabold">Tag{` `}</span>
            <span className="flex items-center text-lg text-gray-500 font-semibold">
              (#bisuness, #tech, #experience, ...)
            </span>
          </h1>
          <input value={post.tag} onChange={(e) => setPost({ ...post, tag: e.target.value })} placeholder="#tag" required className="mt-2 border border-gray-500 bg-gray-200 rounded-lg text-lg pl-2" />
        </label>
        <label>
          <div className="flex justify-between">
            <h1 className="text-3xl font-extrabold">Image</h1>
            {publicId && <button onClick={removeImage} className="delete_btn">Remove</button>}
          </div>
          <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} className={`bg-gray-200 h-48 w-full border border-gray-500 mt-2 rounded-lg relative ${imageUrl && "pointer-events-none"}`} onUpload={handleImageUpload} >
            <div><ImageIcon /></div>
            {imageUrl && <Image src={imageUrl} value={post.imageUrl} fill className="absolute rounded-lg object-cover inset-0" alt="image" />}
          </CldUploadButton>
        </label>
        <label>
          <h1 className="text-3xl font-extrabold">Content</h1>
          <textarea rows="7" value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} placeholder="Content..." required className="mt-2 border border-gray-500 bg-gray-200 rounded-lg text-lg w-full px-2" />
        </label>
        <div className="buttons flex justify-end gap-5">
          <Link href="/profile" className="new_post_cancel">Cancel</Link>
          <button type="submit" disabled={submiting} className="new_post_submit">
            {submiting?((type=="Create")?"Creating...":"Editing..."):type}
          </button>
        </div>
      </form>
    </div>
  );
}
