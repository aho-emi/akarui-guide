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
            { label: "Sticky Message", link: "/guide-yt/sticky_message" },
            {
              label: "Economy",
              items: [
                { label: "Balance", link: "/guide-yt/economy/balance" },
                { label: "Deposit", link: "/guide-yt/economy/deposit" },
                { label: "Withdraw", link: "/guide-yt/economy/withdraw" },
                { label: "Crime & Rob", link: "/guide-yt/economy/crime_rob" },
              ],
            },
            {
              label: "Fun",
              items: [
                { label: "Connect4", link: "/guide-yt/fun/c4" },
                { label: "Wordle", link: "/guide-yt/fun/wordle" },
                { label: "Fishcodetour", link: "/guide-yt/fun/fish" },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
