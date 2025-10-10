import 'dotenv/config';

export default {
  expo: {
    name: "MovieBrowser",
    slug: "movie-browser",
    extra: {
      omdbApiKey: process.env.OMDB_API_KEY,
    },
  },
};
