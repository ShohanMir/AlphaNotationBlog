import React from "react";
import Layout from "../component/Layout";
import Link from "next/link";

function Index() {
  return (
    <Layout>
      <h2>Index page</h2>
      <Link href="/signup">
        <p>Signup</p>
      </Link>
      <Link href="/signin">
        <p>Signin</p>
      </Link>
    </Layout>
  );
}

export default Index;
