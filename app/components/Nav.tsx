// app/components/Nav.tsx
import Link from 'next/link';

// This is our navigation bar at the top of the website.
export default function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/questionnaire">Questionnaire</Link>
    </nav>
  );
}
