import { Job as JobType } from "../models/job";
import { convertTimestampToDateString } from "../utils";

export default function Job(props: JobType) {
  return (
    <div className="w-10/12 m-2 p-6 rounded-lg shadow-md bg-orange-300">
      <h1>Name: {props.name}</h1>
      <h1>Position: {props.position}</h1>
      <h1>Description: {props.description}</h1>
      <h1>Start Date: {convertTimestampToDateString(props.startDate)}</h1>
      <h1>End Date: {convertTimestampToDateString(props.endDate)}</h1>
    </div>
  );
}
