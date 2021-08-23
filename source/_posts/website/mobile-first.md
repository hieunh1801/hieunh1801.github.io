---
title: Thiết kế web mobile first
date: 08/20/2021 09:46:00
tags: ["website", "design"]
---


## Hướng tiếp cận (2 hướng)

- `Progressive Advancement`: đi từ màn hình nhỏ tới màn hình lớn. Tức là ta design cho các thiết bị cỡ nhỏ rồi tăng dần kích thước lên thành màn hình lớn hơn. Khi tăng thì ta sẽ mở rộng các function sao cho phù hợp với thiết bị.

- `Graceful Degradation`: đi ngược lại từ lớn tới nhỏ. Design cho các thiết bị cỡ lớn trước sau đó co dần lại cho các thiết bị cỡ nhỏ, lược bớt các tính năng trên thiết bị đi.

- Hướng tiếp cận `Progressive Advancement` chiến thắng trong cuộc chơi. Lý do: khi tiếp cận từ lớn tới nhỏ, người thiết kế sẽ luôn cố gắng để tất cả các tính năng phải được hiển thị trên màn hình, luôn ép bằng được mọi tính năng, tuy nhiên lại không tính đến việc băng thông của điện thoại, khả năng xử lý của điện thoại, nhất là chart và các tính năng liên quan => do đó gây khó khăn cho cả người dùng lẫn dev. Ngược lại, khi design theo hướng từ nhỏ tới lớn, ta sẽ tập trung vào vấn đề rằng ưu tiên cho điện thoại, ưu tiên cho xử lý trên điện thoại trước, làm cho nó mượt mà. Tập trung vào những gì là cốt lõi nhất. Khi màn hình mở rộng lên => chèn thêm các tính năng vào, cứ như vậy sẽ chuẩn xác hơn. Key word: tập trung vào các tính năng ưu tiên lên hàng đầu. Do đó ta mới có câu `Mobile First`