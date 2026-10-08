import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted">That page does not exist. Try the home page or the projects list.</p>
      <Link href="/" className="btn-secondary mt-6">Back to home</Link>
    </div>
  );
}
