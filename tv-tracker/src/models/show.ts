export default interface Show {
  id: number;
  name: string;
  summary?: string;
  image?: {
    medium: string;
    original: string;
  };
  genres?: string[];
  premiered?: string;
  officialSite?: string;
}
