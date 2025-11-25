export default interface Episode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  airstamp?: Date;
  runtime: number;
  image?: {
    medium: string;
    original: string;
  };
  summary?: string;
}
