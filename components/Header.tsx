import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-100">
      <nav className="flex-auto justify-center">
        <ul className="flex justify-center md:justify-end md:mr-16 lg:mr-64 items-center text-lg gap-4 md:gap-8">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="events">Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
