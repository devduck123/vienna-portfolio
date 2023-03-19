import { Job as JobType } from "../models/job";
import { convertTimestampToDateString } from "../utils";

export default function Job(props: JobType) {
  return (
    <div className="w-full max-w-2xl m-2 p-6 rounded-lg shadow-md bg-orange-300 grid grid-cols-2 gap-4">
      <span>Name:</span>
      <span>{props.name}</span>
      <span>Position:</span>
      <span>{props.position}</span>
      <span>Description:</span>
      <span>{props.description}</span>
      <span>Start Date:</span>
      <span>{convertTimestampToDateString(props.startDate)}</span>
      <span>End Date:</span>
      <span>{convertTimestampToDateString(props.endDate)}</span>
    </div>
  );
}
