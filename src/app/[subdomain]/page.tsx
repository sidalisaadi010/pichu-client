import { headers } from "next/headers";

export default async function Subdomain({
  params,
}: {
  params: { subdomain: string };
}) {
  const host = headers().get("host");
  const isSubdomain = host?.startsWith(`${params.subdomain}.`);
  const isOnRootDomain = host === process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  const isSubdomainOfRootDomain = host?.endsWith(
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
  );

  return (
    <>
      <h1>Welcome to the {params.subdomain} subdomain</h1>
      <h1>Host: {host}</h1>
      <h1>Root Domain: {isOnRootDomain ? "Yes" : "No"}</h1>
      <h1>Subdomain: {isSubdomain ? "Yes" : "No"}</h1>
      <h1>
        Subdomain of Root Domain: {isSubdomainOfRootDomain ? "Yes" : "No"}
      </h1>
    </>
  );
}
