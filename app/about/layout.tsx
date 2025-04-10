import Link from 'next/link';

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <ul>
        <li>
          <Link href="/about/teams"> Teams</Link>
        </li>
        <li>
          <Link href="/about/contacts">Contacts </Link>
        </li>
      </ul>
      {children}
    </div>
  );
}
