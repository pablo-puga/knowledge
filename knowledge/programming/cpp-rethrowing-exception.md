---
title: Rethrowing an exception in C++
date: 2022-03-21T15:05
tags: programming,cpp
description: Notes and examples on how to properly rethrow exceptions in C++ programs.
---

# Rethrowing an exception (the right way)

Fortunately, C++ provides a way to rethrow the exact same exception as the one that was just caught.
To do so, simply use the throw keyword from within the catch block (with no associated variable), like so:

```cpp
#include <iostream>
class Base
{
public:
    Base() {}
    virtual void print() { std::cout << "Base"; }
};

class Derived: public Base
{
public:
    Derived() {}
    virtual void print() { std::cout << "Derived"; }
};

int main()
{
    try
    {
        try
        {
            throw Derived{};
        }
        catch (Base& b)
        {
            std::cout << "Caught Base b, which is actually a ";
            b.print();
            std::cout << "\n";
            throw; // note: We're now rethrowing the object here
        }
    }
    catch (Base& b)
    {
        std::cout << "Caught Base b, which is actually a ";
        b.print();
        std::cout << "\n";
    }

    return 0;
}
```

This prints:

```text
Caught Base b, which is actually a Derived
Caught Base b, which is actually a Derived
```

This throw keyword that doesn't appear to throw anything in particular actually re-throws the exact same exception that was just caught. No copies are made, meaning we don't have to worry about performance killing copies or slicing.
