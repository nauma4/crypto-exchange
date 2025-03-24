import React from 'react'

import Layout from '@/components/Layout'
import Login from '@/pages/Login'

const LoginPage = (): React.ReactNode => {
  return (
    <Layout metadata={{
      title: 'Вход | Fire Exchange'
    }}>
      <Login />
    </Layout>
  )
}

export default LoginPage;