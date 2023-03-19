import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-red-200">
      <nav className="flex-auto justify-center">
        <ul className="flex justify-evenly items-center">
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
