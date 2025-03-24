import React from "react";

import Layout from "@/components/Layout";
import Confirmation from "@/pages/Confirmation";

const ConfPage = (): React.ReactNode => {
  return (
    <Layout
      metadata={{
        title: "Подтверждение | Fire Exchange",
      }}
    >
      <Confirmation />
    </Layout>
  );
};

export default ConfPage;
