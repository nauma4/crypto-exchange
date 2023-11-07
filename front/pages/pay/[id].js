import React from 'react'

import Layout from 'components/Layout'
import Pay from 'pages/Pay'

export default function PayPage () {
  return (
    <Layout metadata={{
      title: 'Оплата | Fire Exchange'
    }}>
      <Pay />
    </Layout>
  )
}