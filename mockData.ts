export const user = {
  id: "1",
  name: "Vienna Tan",
  description: "23 year old Asian Female Event Planner",
  dateOfBirth: new Date("9/9/1999").getTime(),
};

export const jobs = [
  {
    id: "j1",
    name: "job1",
    position: "position1",
    description: "description1",
    startDate: new Date("1/1/2018").getTime(),
    endDate: new Date("2/2/2019").getTime(),
  },
  {
    id: "j2",
    name: "job2",
    position: "position2",
    description: "description2",
    startDate: new Date("1/1/2020").getTime(),
    endDate: new Date("2/2/2021").getTime(),
  },
];

export const events = [
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
