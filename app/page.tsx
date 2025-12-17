import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  const userId = session?.user.id

  if (!userId) redirect("/sign-in");

  redirect("/dashboard");
}

