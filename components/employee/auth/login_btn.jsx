import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
export default function Component() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as{" "}
        {session.user?.role === "student" ? <p>student</p> : <p>Teacher</p>}
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
