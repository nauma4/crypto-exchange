import React from "react";

import Layout from "@/components/Layout";
import Parthners from "@/pages/Parthners";

const ParthnersPage = (): React.ReactNode => {
  return (
    <Layout
      metadata={{
        title: "Партнерская программа | Fire Exchange",
      }}
    >
      <Parthners />
    </Layout>
  );
};

export default ParthnersPage;
