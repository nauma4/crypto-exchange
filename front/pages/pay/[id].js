import React from 'react'

import Layout from 'components/Layout'
import Pay from 'pages/Pay'

export default function PayPage () {
  return (
    <Layout metadata={{
      title: 'Confirmation | Fire Exchange'
    }}>
      <Pay />
    </Layout>
  )
}