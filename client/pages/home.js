import { getCurrentUser } from '@/actions/users'
import React, { useContext, useEffect } from 'react'
import { ApiContext } from './_app'

export default function Home() {
    const api = useContext(ApiContext);
    useEffect(()=>{
        getCurrentUser(api)
    },[])
  return (
    <div>home</div>
  )
}
