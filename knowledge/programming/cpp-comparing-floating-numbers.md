---
title: Comparing Floating Numbers in C++
date: 2022-03-21T14:35
tags: programming,cpp
description: Notes and examples on how to properly compare floating point numbers in C++ programs.
---

# How to properly compare floating point numbers in C++

The most common method of doing floating point equality involves using a function that looks to see if two numbers are almost the same.
If they are "close enough", then we call them equal.
The value used to represent "close enough" is traditionally called **epsilon**. **Epsilon** is generally defined as a small positive number (e.g. 0.00000001, sometimes written 1e-8).

```cpp
#include <algorithm>
#include <iostream>
#include <cmath>

bool approximatelyEqualAbsRel(double a, double b, double absEpsilon, double relEpsilon)
{
    // Check if the numbers are really close -- needed when comparing numbers near zero.
    double diff{ std::abs(a - b) };
    if (diff <= absEpsilon)
        return true;

    // Otherwise fall back to Knuth's algorithm
    return (diff <= (std::max(std::abs(a), std::abs(b)) * relEpsilon));
}

int main()
{
    // a is really close to 1.0, but has rounding errors
    double a{ 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 };

    std::cout << approximatelyEqualAbsRel(a-1.0, 0.0, 1e-12, 1e-8) << '\n'; // compare "almost 0.0" to 0.0
}
```
