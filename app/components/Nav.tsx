// app/components/Nav.tsx
import Link from 'next/link';

// This is our navigation bar at the top of the website.
export default function Nav() {
  return (
    <nav className="p-4 bg-gray-100 flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/questionnaire">Questionnaire</Link>
    </nav>
  );
}
