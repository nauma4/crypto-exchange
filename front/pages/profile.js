import React from 'react'

import Layout from 'components/Layout'
import Profile from 'pages/Profile'

export default function ProfilePage () {
  return (
    <Layout metadata={{
      title: 'Профиль | Fire Exchange'
    }}>
      <Profile />
    </Layout>
  )
}