import React from 'react'

import Layout from '@/components/Layout'
import Parthners from '@/pages/Parthners'

export default function ParthnersPage () {
  return (
    <Layout metadata={{
      title: 'Партнерская программа | Fire Exchange'
    }}>
      <Parthners />
    </Layout>
  )
}