import Head from "next/head";

import Register from "../components/register";
import Select_Category from "../components/select_category";

export default function Home() {
  return (
    <div>
      <Head>
        <title>FYP MANAGEMENT</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content="FYP MANAGEMENT" />
      </Head>
      <Select_Category />
    </div>
  );
}
