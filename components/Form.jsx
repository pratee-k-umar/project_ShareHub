"use client"
import React from 'react'
import { useEffect, useState } from "react"
import { signIn, getProviders } from "next-auth/react"

export default function Form() {
  const [providers, setProviders] = useState(null)
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  }, [])
  return (
    <div className='mt-2 md:mt-8 flex flex-col justify-center w-1/3 mx-auto'>
      {providers && Object.values(providers).map((provider) => (
        <button type='button' key={provider.name} onClick={() => { signIn(provider.id) }} className='sign_in'>Sign in</button> 
      ))}
    </div>
  )
}