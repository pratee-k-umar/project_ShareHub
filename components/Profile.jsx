import Link from "next/link"
import PostCard from "./Postcard"

export default function Profile({ name, data, handleEdit, handleDelete }) {
  return (
    <section>
      {name==="My" ? (
        <div className="mx-auto">
          <div className="flex justify-between p-4 sticky top-24 bg-white z-40">
            <h1 className="text-3xl font-extrabold">{name === "My" ? `${name} Profile` : `${name}'s Profile`}</h1>
            {name==="My" ? (
              <Link href="/create_post" className="create_post">Create Post</Link>
            ) : (
              <></>
            )}
          </div>
          <div className="mt-3">
            {data && data.length > 0 ? (
              data.map((post) => (
                <PostCard key={post._id} name={name} post={post} handleEdit={() => handleEdit(post)} handleDelete={() => handleDelete(post)} />
              ))
            ) : (
              <p className="ml-4">No posts yet</p>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-5 w-1/2">
          <div className="flex justify-between p-4">
            <h1 className="text-3xl font-extrabold">{name === "My" ? `${name} Profile` : `${name}'s Profile`}</h1>
            {name==="My" ? (
              <Link href="/create_post" className="create_post">Create Post</Link>
            ) : (
              <></>
            )}
          </div>
          <div className="mt-3">
            {data && data.length > 0 ? (
              data.map((post) => (
                <PostCard key={post._id} name={name} post={post} handleEdit={() => handleEdit(post)} handleDelete={() => handleDelete(post)} />
              ))
            ) : (
              <p className="ml-4">No posts yet</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}