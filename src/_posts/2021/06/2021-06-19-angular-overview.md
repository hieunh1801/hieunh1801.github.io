---
# top: true
category: technology
tags:
    - angular
date: 2021-06-19
title: Angular Overview
---
Guide of vuepress-theme-meteorlxy.

  

TIP

If you have any questions / ideas about this theme, feel free to open issues / PRs in the Github Repo.

Give this theme a star if you like it 😉

Getting Started
Installation
Config the theme
Write your posts
Theme Language
Introduce the language pack
Translate to your own language
Override the language packs
Posts Comments
Config comments
Config for a single post
Disable comments
Other features
Top post
Draft post
Center syntax
References
Style variables
Frontmatter
#Getting Started
#Installation
Create a new project my-blog :

mkdir my-blog
cd my-blog
Install vuepress and vuepress-theme-meteorlxy:

npm install vuepress vuepress-theme-meteorlxy
Create src/_posts directory and the config file of Vuepress. The structure of your project looks like:
```js
const a = 12;
const b = 123;

```
TIP

Notice that src/index.md or src/README.md is not necessray. This theme will auto add homepage for you.

Add script fields into package.json :