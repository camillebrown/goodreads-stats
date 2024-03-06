import React, { useContext } from 'react'

import useUser from '@/hooks/useUser';
import { ApiContext } from './_app'

export default function Home() {
    const api = useContext(ApiContext);
    const user = useUser(api);
    console.log(user)

  return (
    <div>home</div>
  )
}
