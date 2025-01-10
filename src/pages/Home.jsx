import React from "react";
import Layout from "../components/Layout";
import ProductSearch from "../components/ProductSearch";

function Home() {
  return (
    <Layout>
      <div className="w-full bg-white p-6 h-fit rounded-lg shadow-md">
        <ProductSearch />
      </div>
    </Layout>
  );
}

export default Home;
