---
title: Navigation Between Two Screen
date: 06/08/2021 22:47:00
tags: ["android", "kotlin"]
categories: ["android-kotlin"]
---

## Introduction to Intents

- `Intent` là một đối tượng đại diện cho một số hành động sẽ được thực hiện
  - Mở activity (đề cập trong bài này)
  - Mở nhiều cái nữa (sẽ đề cập thêm)
- `Explicit Intent`:
  - ý định tường minh
  - tức là ta đã rõ ràng là intent đó muốn mở activity nào (thường là trong ứng dụng của chúng ta)
  - Ví dụ từ màn hình 1 => nhảy tới màn hình 2 (ta biết rõ đó là màn hình 2 rồi)
- `Implicit Intent`:
  - ý định không tường minh
  - sử dụng intent để mở tới một activity nào đó ta không biết. Thường là mở một ứng dụng khác
  - ví dụ - chia sẻ dữ liệu location giữa các ứng dụng

> Bản chất là android chính là một app lớn, và các app chúng ta viết chính là app nhỏ hoạt động dựa trên cái app lớn đó, và app đó quy định sử dụng intent để làm nhiều việc OK

## Implement

- Di chuyển && truyền dữ liệu giữa các activity trong app sử dụng `Explicit Intent`
- Di chuyển && truyền dữ liệu giữa các ứng dụng sử dụng `Implicit Intent`

### Explicit Intent
{% codeblock lang:kotlin MainActivity.kt %}
// Tạo một intent
val intent = Intent(this, DetailActivity::class.java)

// Thêm information vào trong intent
intent.putExtra("key1", "value1")
intent.putExtra("key2", 1)
intent.putExtra("key3", 1.4)
intent.putExtra("key4", "value1")
intent.putExtra("key5", "value1")
intent.putExtra("key6", "value1")

// Khởi động intent
this.startActivity(intent)
{% endcodeblock %}


{% codeblock lang:kotlin DetailActivity.kt %}
// Nhận dữ liệu từ intent
val message = this.intent?.getStringExtra("key1000") ?: "default"
{% endcodeblock %}

### Implicit Intent

## Tài liệu tham khảo

- [google-code-lab](https://developer.android.com/codelabs/basic-android-kotlin-training-activities-intents?continue=https%3A%2F%2Fdeveloper.android.com%2Fcourses%2Fpathways%2Fandroid-basics-kotlin-unit-3-pathway-1%23codelab-https%3A%2F%2Fdeveloper.android.com%2Fcodelabs%2Fbasic-android-kotlin-training-activities-intents#0)