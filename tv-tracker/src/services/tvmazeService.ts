import Show from "../models/show";
import Episode from "../models/episode";

const BASE_URL = "https://api.tvmaze.com";

/**
 * Searches for shows by name
 */
export async function searchShows(query: string): Promise<Show[]> {
  const response = await fetch(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch shows: ${response.status}`);
  }

  const data = await response.json();
  // TVmaze returns { show: {...} } objects
  return data.map((item: any) => item.show);
}

/**
 * Fetch a show by its ID
 */
export async function getShowById(id: number): Promise<Show> {
  const response = await fetch(`${BASE_URL}/shows/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch show with ID ${id}`);
  }

  return response.json();
}

/**
 * Fetch episodes for a specific show
 */
export async function getEpisodes(showId: number): Promise<Episode[]> {
  const response = await fetch(`${BASE_URL}/shows/${showId}/episodes`);

  if (!response.ok) {
    throw new Error(`Failed to fetch episodes for show ${showId}`);
  }

  return response.json();
}
