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
              items: [
                { label: "Sticky Message", link: "/guide/sticky_message" },
              ],
            },
            {
              label: "Economy",
              items: [
                { label: "Balance", link: "/guide/economy/balance" },
                { label: "Deposit", link: "/guide/economy/deposit" },
                { label: "Withdraw", link: "/guide/economy/withdraw" },
                { label: "Crime & Rob", link: "/guide/economy/crime_rob" },
              ],
            },
            {
              label: "Fun",
              items: [
                { label: "Connect4", link: "/guide/fun/c4" },
                { label: "Wordle", link: "/guide/fun/wordle" },
                { label: "Fish", link: "/guide/fun/fish" },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
