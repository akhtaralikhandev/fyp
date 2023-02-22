import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
const Home = () => {
  const router = useRouter();
  return (
    <div>
      Home
      <button
        onClick={() => {
          signOut();
          router.push("/student/login");
        }}
      >
        sign ou
      </button>
    </div>
  );
};

export default Home;
