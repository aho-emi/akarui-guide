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
            { label: "Sticky Message", link: "/guides/sticky_message" },
            {
              label: "Economy",
              items: [
                { label: "Balance", link: "/guides/economy/balance" },
                { label: "Deposit", link: "/guides/economy/deposit" },
                { label: "Withdraw", link: "/guides/economy/withdraw" },
                { label: "Crime & Rob", link: "/guides/economy/crime_rob" },
              ],
            },
            {
              label: "Fun",
              items: [{ label: "Connect4", link: "/guides/fun/c4" }],
            },
          ],
        },
      ],
    }),
  ],
});
