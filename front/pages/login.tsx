import React from 'react'

import Layout from '@/components/Layout'
import Login from '@/pages/Login'

export default function LoginPage () {
  return (
    <Layout metadata={{
      title: 'Вход | Fire Exchange'
    }}>
      <Login />
    </Layout>
  )
}