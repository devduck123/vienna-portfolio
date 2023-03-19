import { Event } from "./models/event";
import { Job } from "./models/job";
import { User } from "./models/user";

export const users: User[] = [
  {
    id: "1",
    name: "Vienna Tan",
    description: "23 year old Asian Female Event Planner",
    dateOfBirth: new Date("9/9/1999").getTime(),
  },
];

export const jobs: Job[] = [
  {
    id: "j1",
    name: "CBRE@Meta",
    position: "Meeting & Event Planner",
    description:
      "Support Meta C-level Execs and teams with internal event requests, including company-wide events and All Hands, summits, fireside chats, video shoots in Meta Reality Labs, and more...",
    startDate: new Date("3/7/2022").getTime(),
    endDate: new Date("4/1/2023").getTime(),
  },
  {
    id: "j2",
    name: "California Polytechnic State University, Pomona",
    position: "Special Events & Event Planner",
    description: "Execute events for university post-pandemic",
    startDate: new Date("5/1/2021").getTime(),
    endDate: new Date("3/1/2022").getTime(),
  },
];

export const events: Event[] = [
  {
    id: "e1",
    title: "title1",
    description: "description1",
    date: new Date().getTime(),
    images: ["url1", "url2", "url3"],
  },
  {
    id: "e2",
    title: "title2",
    description: "description2",
    date: new Date().getTime(),
    images: ["url1", "url2", "url3"],
  },
];
