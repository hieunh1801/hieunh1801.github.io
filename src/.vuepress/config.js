// .vuepress/config.js

module.exports = {
  // Title of your website
  title: "Bob's bloc",

  // Description of your website
  description: "This is blog of Bob",

  // Language of your website
  locales: {
    "/": {
      lang: "vi-VN",
    },
  },

  // Theme to use
  theme: "meteorlxy",

  // Theme config
  themeConfig: {
    // Language of this theme. See the [Theme Language] section below.
    lang: "vi-vn",

    // Personal infomation (delete the fields if you don't have / don't want to display)
    personalInfo: {
      // Nickname
      nickname: "bob",

      // Introduction of yourself (HTML supported)
      description: "coder coding",

      // Email
      email: "hieunh1801@gmail.com",

      // Your location
      location: "Ha Noi, VietNam",

      // Your organization
      organization: "FPT Telecom",

      // Your avatar image
      // Set to external link
      // Or put into `.vuepress/public` directory. E.g. `.vuepress/public/img/avatar.jpg`
      avatar: "/img/avatar.jpg",

      // Accounts of SNS
      sns: {
        // Github account and link
        github: {
          account: "hieunh1801",
          link: "https://github.com/hieunh1801",
        },
      },
    },

    // Header Config (Optional)
    header: {
      background: {
        // URL of the background image. If you set the URL, the random pattern will not be generated, and the `useGeo` will be ignored.
        url: "/img/herobander.jpg",

        // Use random pattern. If you set it to `false`, and you don't set the image URL, the background will be blank.
        useGeo: true,
      },

      // show title in the header or not
      showTitle: true,
    },

    // Footer Config (Optional)
    footer: {
      // Show 'Powered by VuePress' or not (enable it to support VuePress)
      // poweredBy: true,

      // Show the theme that you are using (enable it to support this theme) (please do not disable it, haha)
      // poweredByTheme: true,

      // Add your custom footer (HTML supported)
      // custom: "All free",
    },

    // Info Card Config (Optional)
    infoCard: {
      // The background of the info card's header. You can choose to use an image, or to use random pattern (geopattern)
      headerBackground: {
        // URL of the background image. If you set the URL, the random pattern will not be generated, and the `useGeo` will be ignored.
        url: "/img/background-2b.jpg",

        // Use random pattern. If you set it to `false`, and you don't set the image URL, the background will be blank.
        useGeo: true,
      },
    },

    // Show the last updated time of your posts
    lastUpdated: true,

    // The content of your navbar links
    nav: [
      { text: "Home", link: "/", exact: true },
      { text: "Posts", link: "/posts/", exact: false },
    ],

    // Enable smooth scrolling or not
    smoothScroll: true,

    // Configs for vuepress-plugin-zooming
    zooming: {
      // @see https://vuepress.github.io/en/plugins/zooming
    },

    comments: false,
    // Comments config. See the [Posts Comments] section below.
    // comments: {
    //   owner: "meteorlxy",
    //   repo: "vuepress-theme-meteorlxy",
    //   clientId: "MY_CLIENT_ID",
    //   clientSecret: "MY_CLIENT_SECRET",
    // },

    // Pagination config (Optional)
    pagination: {
      perPage: 20,
    },

    // Default Pages (Optional, the default value of all pages is `true`)
    defaultPages: {
      // Allow theme to add Home page (url: /)
      home: true,
      // Allow theme to add Posts page (url: /posts/)
      posts: true,
      angular: true,
    },
  },
};
