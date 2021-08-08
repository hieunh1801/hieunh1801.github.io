---
title: Multiple source folder trong App
date: 07/08/2022 15:14:00
updated: 
tags: 
categories: ["android-kotlin"]
---

Thêm nhiều subfolder trong App

## Step 1: Thêm sourceSet vào trong file build.gradle 
{% codeblock lang:gradle build.gradle %}
android {
    // ... 
    // Thêm source set để đánh dấu các thư mục sẽ là source của ta

    sourceSets {
        main {
            res.srcDirs = [
                    'src/main/res',
                    'src/main/res/layout',
                    'src/main/res/layouts',
            ]
        }
    }
}
{% endcodeblock %}

## Step 2: Sync lại gradle

## Step 3: Thêm thư mục source mới
