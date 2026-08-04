import { redirect } from "next/navigation";

export default function JobsIndexPage() {
  // We list jobs on the homepage, so navigating to /jobs should just go to the homepage
  redirect("/");
}
