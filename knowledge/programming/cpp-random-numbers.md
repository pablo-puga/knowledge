---
title: Generating Randon Numbers in C++
date: 2022-03-21T14:50
tags: programming,cpp
description: Notes and examples on how to properly generate random numbers in C++ programs.
---

# Properly genearating random numbers in C++

C++11 added a ton of random number generation functionality to the C++ standard library, including the **Mersenne Twister algorithm**, as well as generators for different kinds of random distributions (uniform, normal, Poisson, etc…). This is accessed via the `<random>` header.

You'll note that Mersenne Twister generates random 32-bit unsigned integers (not 15-bit integers like `std::rand()`), giving a lot more range. There's also a version (std::mt19937_64) for generating 64-bit unsigned integers.

Here's a short example showing how to generate random numbers in C++11 using Mersenne Twister

```cpp
#include <iostream>
#include <random> // for std::mt19937
#include <ctime> // for std::time

int main()
{
	// Initialize our mersenne twister with a random seed based on the clock
	std::mt19937 mersenne{ static_cast<std::mt19937::result_type>(std::time(nullptr)) };

	// Create a reusable random number generator that generates uniform numbers between 1 and 6
	std::uniform_int_distribution die{ 1, 6 };
	// If your compiler doesn't support C++17, use this instead
	// std::uniform_int_distribution<> die{ 1, 6 };

	// Print a bunch of random numbers
	for (int count{ 1 }; count <= 48; ++count)
	{
		std::cout << die(mersenne) << '\t'; // generate a roll of the die here

		// If we've printed 6 numbers, start a new row
		if (count % 6 == 0)
			std::cout << '\n';
	}

	return 0;
}
```

> 💡 Before C++17, you need to add empty brackets to create die after the type std::uniform_int_distribution<> die{ 1, 6 }

## Random numbers across multiple functions

The above example create a random generator for use within a single function. What happens if we want to use a random number generator in multiple functions?

Although you can create a static local std::mt19937 variable in each function that needs it (static so that it only gets seeded once), it's a little overkill to have every function that needs a random number generator seed and maintain its own local generator. A better option in most cases is to create a global random number generator (inside a namespace!). Remember how we told you to avoid non-const global variables? This is an exception (also note: std::rand() and std::srand() access a global object, so there's precedent for this).

```cpp
#include <iostream>
#include <random> // for std::mt19937
#include <ctime> // for std::time

namespace MyRandom
{
	// Initialize our mersenne twister with a random seed based on the clock (once at system startup)
	std::mt19937 mersenne{ static_cast<std::mt19937::result_type>(std::time(nullptr)) };
}

int getRandomNumber(int min, int max)
{
	std::uniform_int_distribution die{ min, max }; // we can create a distribution in any function that needs it
	return die(MyRandom::mersenne); // and then generate a random number from our global generator
}

int main()
{
	std::cout << getRandomNumber(1, 6) << '\n';
	std::cout << getRandomNumber(1, 10) << '\n';
	std::cout << getRandomNumber(1, 20) << '\n';

	return 0;
}
```
