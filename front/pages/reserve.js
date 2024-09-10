import React from 'react'

import Layout from '@/components/Layout'
import Reserve from '@/pages/Reserve'

export default function ReservePage () {
  return (
    <Layout metadata={{
      title: 'Резервы | Fire Exchange'
    }}>
      <Reserve />
    </Layout>
  )
}