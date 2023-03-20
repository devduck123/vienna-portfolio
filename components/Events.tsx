import { events } from "../mockData";
import Event from "../components/Event";

export default function Events() {
  const eventsAsElements = events.map((event) => (
    <Event
      key={event.id}
      id={event.id}
      title={event.title}
      description={event.description}
      date={event.date}
      images={event.images}
    />
  ));

  return (
    <section className="flex flex-col justify-center items-center p-6 bg-blue-200">
      {/* <h1 className="text-5xl font-bold mb-4">Events</h1> */}
      {eventsAsElements}
    </section>
  );
}
