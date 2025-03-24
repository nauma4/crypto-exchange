import React from "react";

import Layout from "@/components/Layout";
import Faq from "@/pages/Faq";

const FaqPage = (): React.ReactNode => {
  return (
    <Layout
      metadata={{
        title: "FAQ | Fire Exchange",
      }}
    >
      <Faq />
    </Layout>
  );
};

export default FaqPage;
