---
title: "How to deploy github page (index.html)"
description: "How to deploy github page"
publishDate: "2025-11-15T18:43:00Z"
# updatedDate: "14 August 2023"
# coverImage:
#   src: "./cover.png"
#   alt: "Astro build wallpaper"
tags: ["howto", "it"]
---

### Introduction

I want to deploy github page

### What You Need

- Environment: nodejs
- A file `index.html`

### Step-by-Step Guide

#### Step 1: Create new repository
![create_repo](image_1.png)
![config_visibility_and_create](image_2.png)
    + Ensure that visibility is Publish => Otherwise you can't see `Pages`
#### Step 2: Clone to your local machine
![clone to local](image.png)

#### Step 3: Add `index.html`
![alt text](image-2.png)
#### Step 4: Install gh-pages
![alt text](image-3.png)
![alt text](image-4.png)
#### Step 5: Using gh-pages to publish
![alt text](image-5.png)
![alt text](image-6.png)
#### Step 6: Turn your repo become pages
![alt text](image-7.png)
![alt text](image-8.png)
### Tips & Common Mistakes

#### Common 1: Cannot find resource (html, js, css, ...) in folder start with `_` like `_astro`
- Reason: gh-pages normaly use `jekyll` => It automaticlly ignore folder start with `_` for security issues.
- How to fix: 
    + Add `.nojekyll` to dist folder
    + Update command `gh-pages -d dist --dotfiles` to publish --dotfiles

### Conclusion

- Let me know more if you have any issues. Thanks.