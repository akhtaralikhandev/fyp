import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Component() {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      router.push("/student/home");
    }
  }, [session, router]);
  if (session) {
    return (
      <>
        Signed in as{" "}
        {session.user?.name === "khan"
          ? router.push("/student/createGroup")
          : router.push("/employee/createGroup")}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
