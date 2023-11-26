"use client"
import Footer from "@/components/Footer"
import Form from "@/components/Form"
import PostCard from "@/components/Postcard"
import { handleSearch } from "@/utils/handleSearch"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"


export default function Home({ onSearchChange }) {
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [searchText, setSearchText] = useState("")
  const [searchTimeOut, setSearchTimeOut] = useState(null)
  const [searchedPosts, setSearchedPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/newpost")
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])
  const fetchPosts = async () => {
    const response = await fetch("/api/newpost")
    const data = await response.json()
    setAllPosts(data)
  }
  useEffect(() => {
    fetchPosts()
  }, [])
  const filterPosts = (searchText) => {
    const regex = new RegExp(searchText, "i")
    return allPosts.filter((item) => { regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.content) })
  }
  const handleSearchChange = (newSearchText) => {
    clearTimeout(searchTimeOut)
    setSearchText(newSearchText)
    onSearchChange(newSearchText)
    setSearchTimeOut(
      setTimeout(() => {
        const searchResult = filterPosts(newSearchText)
        setSearchedPosts(searchResult)
      }, 500)
    )
  }
  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPosts(tagName);
    setSearchedPosts(searchResult);
  }
  return (
    <section>
      {session?.user.id ? (
        <div className="mt-5 w-full sm:w-1/2 mx-auto">
          {allPosts && searchText ? searchedPosts.map((post) => (
            <PostCard key={post._id} post={post} handleTagClick={handleTagClick} />
          )) : allPosts.map((post) => (
            <PostCard key={post._id} post={post} handleTagClick={handleTagClick} />
          ))}
        </div>
      ) : (
        <div>
          <div className="bg-white app mt-8 mb-0 md:mt-16 w-1/2 mx-auto">
            <h1 className="text-center font-extrabold text-blue-600 text-4xl md:text-6xl">S<span className="text-4xl font-extrabold text-black text-4xl md:text-6xl">hare </span>H<span className="font-extrabold text-black text-4xl md:text-6xl">ub</span></h1>
          </div>
          <div className='discription w-2/3 md:w-1/3 mx-auto mt-12'>
            <p className='text-center text-sm sm:text-base lg:text-lg font-semibold'>
              ShareHub is not just a platform; it's a vibrant ecosystem of learning, sharing, and storytelling. Whether you're seeking practical advice, looking for facts, or yearning to share your own experiences, ShareHub welcomes you to join the diverse community. Here, knowledge and personal narratives intertwine, creating a rich tapestry of wisdom and shared human experiences. <br /><br /> Explore, learn, and share on ShareHub—where knowledge and personal stories come together.
            </p>
          </div>
          <Form />
          <Footer />
        </div>
      )}
    </section>
  )
}