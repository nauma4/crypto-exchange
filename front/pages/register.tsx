import React from "react";

import Layout from "@/components/Layout";
import Register from "@/pages/Register";

const RegisterPage = (): React.ReactNode => {
  return (
    <Layout
      metadata={{
        title: "Регистрация | Fire Exchange",
      }}
    >
      <Register />
    </Layout>
  );
};

export default RegisterPage;
