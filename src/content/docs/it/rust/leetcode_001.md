---
title: Leetcode 001
description: this is leetcode 001
---

```rust
use std::collections::HashMap;
use std::vec;

#[derive(Debug, PartialEq)]
struct InputOutput {
    pub nums: Vec<i32>,
    pub target: i32,
    pub output: Vec<i32>,
}

fn main() {
    let test_cases = get_test_cases();

    for InputOutput {
        nums,
        target,
        output,
    } in test_cases
    {
        assert_eq!(output, two_sum_hash(nums, target));
    }
}

pub fn two_sum_hash(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut map = HashMap::new();

    for (i, num) in nums.iter().enumerate() {
        let complement = target - num;
        if let Some(&j) = map.get(&complement) {
            return vec![j as i32, i as i32];
        }
        map.insert(num, i);
    }
    vec![]
}

pub fn two_sum_bruce_force(nums: Vec<i32>, target: i32) -> Vec<i32> {
    for i in 0..nums.len() {
        for j in i + 1..nums.len() {
            if nums[i] + nums[j] == target {
                return vec![i as i32, j as i32];
            }
        }
    }
    vec![]
}

fn get_test_cases() -> Vec<InputOutput> {
    let test_cases = vec![
        InputOutput {
            nums: vec![2, 7, 11, 15],
            target: 9,
            output: vec![0, 1], // nums[0] + nums[1] = 2 + 7 = 9
        },
        InputOutput {
            nums: vec![-3, 4, 3, 90],
            target: 0,
            output: vec![0, 2], // nums[0] + nums[2] = -3 + 3 = 0
        },
        InputOutput {
            nums: vec![3, 2, 4, 3],
            target: 6,
            output: vec![1, 2], // nums[1] + nums[2] = 2 + 4 = 6
        },
        InputOutput {
            nums: vec![1, 2],
            target: 3,
            output: vec![0, 1], // nums[0] + nums[1] = 1 + 2 = 3
        },
        InputOutput {
            nums: vec![1000000, 2000000, 3000000],
            target: 5000000,
            output: vec![1, 2], // nums[1] + nums[2] = 2000000 + 3000000 = 5000000
        },
        // Trường hợp 6: Cặp số trùng nhau
        InputOutput {
            nums: vec![3, 3],
            target: 6,
            output: vec![0, 1], // nums[0] + nums[1] = 3 + 3 = 6
        },
    ];
    test_cases
}
```
