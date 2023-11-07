import React from 'react'

import Layout from 'components/Layout'
import MainPage from 'pages/Main'

export default function HomePage () {
  return (
    <Layout metadata={{
      title: 'Главная | Fire Exchange'
    }}>
      <MainPage />
    </Layout>
  )
}