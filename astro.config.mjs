// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightSidebarTopics from "starlight-sidebar-topics";

// https://astro.build/config
export default defineConfig({
  site: "https://hieunh1801.github.io",
  integrations: [
    starlight({
      title: "My Docs",
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
  ],
});
