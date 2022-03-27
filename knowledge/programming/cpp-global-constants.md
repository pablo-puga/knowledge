---
title: Global Constants in C++
date: 2022-03-21T14:40
tags: programming,cpp
description: Notes and examples on how to properly implement global constants in C++ programs.
---

# Declaring Global Constants in C++

C++17 introduced a new concept called `inline variables`. In C++, the term `inline` has evolved to mean "multiple definitions are allowed". Thus, an **inline variable** is one that is allowed to be defined in multiple files without violating the one definition rule. Inline global variables have external linkage by default.

Inline variables have two primary restrictions that must be obeyed:

1. All definitions of the inline variable must be identical (otherwise, undefined behavior will result)
2. The inline variable definition (not a forward declaration) must be present in any file that uses the variable.

The linker will consolidate all inline definitions into a single variable definition. This allows us to define variables in a header file and have them treated as if there was only one definition in a .cpp file somewhere. These variables also retain their constexpr-ness in all files in which they are included.

With this, we can go back to defining our globals in a header file without the downside of duplicated variables:

```cpp
#ifndef CONSTANTS_H
#define CONSTANTS_H

// define your own namespace to hold constants
namespace constants
{
    inline constexpr double pi { 3.14159 }; // note: now inline constexpr
    inline constexpr double avogadro { 6.0221413e23 };
    inline constexpr double my_gravity { 9.2 }; // m/s^2 -- gravity is light on this planet
    // ... other related constants
}
#endif
```

```cpp
#include "constants.h"

#include <iostream>

int main()
{
    std::cout << "Enter a radius: ";
    int radius{};
    std::cin >> radius;

    std::cout << "The circumference is: " << 2.0 * radius * constants::pi << '\n';

    return 0;
}
```

We can include constants.h into as many code files as we want, but these variables will only be instantiated once and shared across all code files.

> 💡 **Best practice**  
> If you need global constants and your compiler is C++17 capable, prefer defining inline constexpr global variables in a header file.
