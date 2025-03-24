import React from "react";

import Layout from "@/components/Layout";
import MainPage from "@/pages/Main";

const HomePage = (): React.ReactNode => {
  return (
    <Layout
      metadata={{
        title: "Главная | Fire Exchange",
      }}
    >
      <MainPage />
    </Layout>
  );
};

export default HomePage;
