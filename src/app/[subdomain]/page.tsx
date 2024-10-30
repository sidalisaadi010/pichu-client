export default function Subdomain({ params }: { params: { subdomain: string } }) {
    return <h1>Welcome to the {params.subdomain} subdomain</h1>
  }