import React from "react";

import Layout from "@/components/Layout";
import Pay from "@/pages/Pay";

const PayPage = (): React.ReactNode => {
  return (
    <Layout
      metadata={{
        title: "Оплата | Fire Exchange",
      }}
    >
      <Pay />
    </Layout>
  );
};

export default PayPage;
