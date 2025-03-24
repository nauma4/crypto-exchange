import React from "react";

import Layout from "@/components/Layout";
import Reserve from "@/pages/Reserve";

const ReservePage = (): React.ReactNode => {
  return (
    <Layout
      metadata={{
        title: "Резервы | Fire Exchange",
      }}
    >
      <Reserve />
    </Layout>
  );
};

export default ReservePage;
