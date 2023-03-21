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
    title: "Welcome Back Events at Meta",
    description:
      "Later in 2022, Meta organized another series of events to welcome all Metamates the office across the Bay Area. With a considerable budget, we were able to host these events in our favorite vendors for decoration, entertainment, and catering. My favorite activities included live music, local food and coffee vendors, art workshops, pumpkin decorating, movie nights, swag giveaways, photo booths, toy drives and care packages to give back to the community, and more. I’m so proud to have lead and executed all graphic communications and design for this project. I had a blast designing marketing materials, event signage, stickers, and Facebook posts to promote these events. Each of these events hosted up to 1,500 attendees guaranteed to have a fun time!",
    date: new Date("2/22/2022").getTime(),
    images: ["url1", "url2", "url3"],
  },
  {
    id: "e2",
    title: "Ambassador Program at Meta",
    description:
      "Meta organized a campus-wide events to welcome all Metamates back to the office. With this initiative, we worked closely with our cross-functional teams to highlight different Meta groups and amenities that our facilities managed to support Meta employees. We had scavenger hunt, swag giveaway, karaoke time, donation drives for volunteer groups local to each campus, and more. Event was so successful, our team was asked to host a second session later that year!",
    date: new Date("2/22/2022").getTime(),
    images: ["url1", "url2", "url3"],
  },
  {
    id: "e3",
    title: "CBRE LINK@Summer Fest",
    description:
      "CBRE LINK organized their first in person gather since the pandemic in San Mateo, CA. I led all digital communications and graphic designs for this event, which was so much fun especially when I got to eat my own designs on cookies!",
    date: new Date("2/22/2022").getTime(),
    images: ["url1", "url2", "url3"],
  },
];
