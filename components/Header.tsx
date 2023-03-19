import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-100">
      <nav className="flex-auto justify-center">
        <ul className="flex justify-evenly items-center text-lg">
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