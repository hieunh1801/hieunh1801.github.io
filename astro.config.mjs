// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightSidebarTopics from "starlight-sidebar-topics";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://hieunh1801.github.io",
  integrations: [
    starlight({
      title: "Hieu ˚ʚ♡ɞ˚ Tham",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      plugins: [
        starlightSidebarTopics([
          {
            id: "home",
            label: "Home",
            link: "/",
            icon: "rocket",
            items: ["index"],
          },
          {
            id: "it",
            label: "IT",
            link: "/it/",
            icon: "open-book",
            items: [
              {
                label: "Java",
                autogenerate: { directory: "it/java" },
              },
              {
                label: "Rust",
                autogenerate: { directory: "it/rust" },
              },
            ],
          },
          {
            id: "language",
            label: "Language",
            link: "/language/",
            icon: "document",
            items: [
              {
                label: "English",
                autogenerate: { directory: "language/english" },
              },
              {
                label: "Korean",
                autogenerate: { directory: "language/korean" },
              },
            ],
          },
          {
            id: "english",
            label: "English",
            link: "/english/",
            icon: "document",
            items: [
              {
                label: "English",
                autogenerate: { directory: "english" },
              },
            ],
          },
        ]),
      ],
      // sidebar: [
      //   {
      //     label: "IT",
      //     autogenerate: { directory: "it" },
      //   },
      //   {
      //     label: "Language",
      //     autogenerate: { directory: "language" },
      //   },
      // ],
    }),
    // tailwind(),
  ],
});
