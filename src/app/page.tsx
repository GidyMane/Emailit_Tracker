import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { LandingPage } from "@/components/landingpage";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    redirect("/dashboard");
  }

  return <LandingPage />;
}
