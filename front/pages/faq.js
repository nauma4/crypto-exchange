import React from 'react'

import Layout from '@/components/Layout'
import Faq from '@/pages/Faq'

export default function FaqPage () {
  return (
    <Layout metadata={{
      title: 'FAQ | Fire Exchange'
    }}>
      <Faq />
    </Layout>
  )
}