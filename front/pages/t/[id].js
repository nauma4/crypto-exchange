import React from 'react'

import Layout from '@/components/Layout'
import Confirmation from '@/pages/Confirmation'

export default function ConfPage () {
  return (
    <Layout metadata={{
      title: 'Подтверждение | Fire Exchange'
    }}>
      <Confirmation />
    </Layout>
  )
}