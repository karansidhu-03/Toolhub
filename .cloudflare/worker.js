export default {
  async fetch(request, env, ctx) {
    // This tells Cloudflare: "Don't say Hello World, 
    // just show the files from the 'dist' folder."
    return env.ASSETS.fetch(request);
  },
};
