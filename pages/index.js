import Head from "next/head";
import Login_btn from "../components/auth/login_btn";

export default function Home() {
  return (
    <div>
      <Head>
        <title>FYP MANAGEMENT</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content="FYP MANAGEMENT" />
      </Head>
      <Login_btn />
    </div>
  );
}
