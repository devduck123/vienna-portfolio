export type Event = {
  id: string;
  title: string;
  description: string;
  date: number; // timestamp
  images: string[]; // links to S3 object
};
