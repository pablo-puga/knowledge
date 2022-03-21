---
title: Referencing std::vector elements in C++
date: 2022-03-21T15:00
tags: programming,cpp
---

# Using std::reference_wrapper to reference elements in std::vector lists

In the `Department`/`Teacher` example above, we used a reference in the `Department` to store the `Teacher`. This works fine if there is only one `Teacher`, but if there is a list of `Teacher`s, say `std::vector`, we can't use references anymore.

```cpp
**std::vector<const Teacher&> m_teachers{}; // Illegal**
```

List elements cannot be references, because references have to be initialized and cannot be reassigned. Instead of references, we could use pointers, but that would open the possibility to store or pass null pointers. In the `Department`/`Teacher` example, we don't want to allow null pointers. To solve this, there's `std::reference_wrapper`.

Essentially, `std::reference_wrapper` is a class that acts like a reference, but also allows assignment and copying, so it's compatible with lists like `std::vector`.

The good news is that you don't really need to understand how it works to use it. All you need to know are three things:

1. `std::reference_wrapper` lives in the <functional> header.
2. When you create your `std::reference_wrapper` wrapped object, the object can't be an anonymous object (since anonymous objects have expression scope would leave the reference dangling).
3. When you want to get your object back out of `std::reference_wrapper`, you use the `get()` member function.

Here's an example using `std::reference_wrapper` in a `std::vector`:

```cpp
#include <functional> // std::reference_wrapper
#include <iostream>
#include <vector>
#include <string>

int main()
{
  std::string tom{ "Tom" };
  std::string berta{ "Berta" };

  std::vector<std::reference_wrapper<std::string>> names{ tom, berta };

  std::string jim{ "Jim" };

  names.push_back(jim);

  for (auto name : names)
  {
    // Use the get() member function to get the referenced string.
    name.get() += " Beam";
  }

  std::cout << jim << '\n'; // Jim Beam

  return 0;
}
```

To create a vector of const references, we'd have to add const before the std::string like so

```cpp
// Vector of const references to std::string
std::vector<std::reference_wrapper<const std::string>> names{ tom, berta };
```
