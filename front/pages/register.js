import React from 'react'

import Layout from 'components/Layout'
import Register from 'pages/Register'

export default function RegisterPage () {
  return (
    <Layout metadata={{
      title: 'Регистрация | Fire Exchange'
    }}>
      <Register />
    </Layout>
  )
}