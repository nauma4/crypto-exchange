import React from "react";

import Layout from "@/components/Layout";
import Profile from "@/pages/Profile";

const ProfilePage = (): React.ReactNode => {
  return (
    <Layout
      metadata={{
        title: "Профиль | Fire Exchange",
      }}
    >
      <Profile />
    </Layout>
  );
};

export default ProfilePage;
