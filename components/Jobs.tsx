import { jobs } from "../mockData";
import Job from "./Job";

export default function Jobs() {
  const jobsAsElements = jobs.map((job) => (
    <Job
      key={job.id}
      id={job.id}
      name={job.name}
      position={job.position}
      description={job.description}
      startDate={job.startDate}
      endDate={job.endDate}
    />
  ));

  return (
    <section className="bg-blue-200 flex flex-col justify-center items-center p-6">
      <h1 className="text-5xl font-bold mb-4">Experience</h1>
      {jobsAsElements}
    </section>
  );
}
