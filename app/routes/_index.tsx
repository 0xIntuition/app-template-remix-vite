import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export async function loader(args: LoaderFunctionArgs) {
  throw redirect("/app", 302);
}

export default function Index() {
  return (
    <div className="relative h-full w-full">
      <Outlet />
    </div>
  );
}
