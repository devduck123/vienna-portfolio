export type Event = {
  id: string;
  title: string;
  description: string;
  date: number; // timestamp
  images?: string[] | undefined; // links to S3 object
};
