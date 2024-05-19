import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Akarui: Guide",
      social: {
        github: "https://github.com/withastro/starlight",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: "Utility",
              autogenerate: { directory: "/guides/utility" },
            },
            {
              label: "Economy",
              autogenerate: { directory: "/guides/economy" },
            },
            {
              label: "Fun",
              autogenerate: { directory: "/guides/fun" },
            },
          ],
        },
      ],
    }),
  ],
});
