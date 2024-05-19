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
            { label: "Sticky Message", link: "/guides.yt/sticky_message" },
            {
              label: "Economy",
              items: [
                { label: "Balance", link: "/guides.yt/economy/balance" },
                { label: "Deposit", link: "/guides.yt/economy/deposit" },
                { label: "Withdraw", link: "/guides.yt/economy/withdraw" },
                { label: "Crime & Rob", link: "/guides.yt/economy/crime_rob" },
              ],
            },
            {
              label: "Fun",
              items: [
                { label: "Connect4", link: "/guides.yt/fun/c4" },
                { label: "Wordle", link: "/guides.yt/fun/wordle" },
                { label: "Fishcodetour", link: "/guides.yt/fun/fish" },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
