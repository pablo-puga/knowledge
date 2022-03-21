---
title: UTF characters in C++
date: 2022-03-21T15:10
tags: programming,cpp
---

# Using UTF characters in C++

### **Explanation**

1. Ordinary character literal or narrow character literal, e.g. 'a' or '**\n**' or '**\13**'. Such literal has type char and the value equal to the representation of _c-char_ in the [execution character set](https://en.cppreference.com/w/cpp/language/translation_phases#Phase_5).

2. UTF-8 character literal, e.g. u8'a'. Such literal has type char (until C++20) char8_t (since C++20) and the value equal to ISO 10646 code point value of _c-char_, provided that the code point value is representable with a single UTF-8 code unit (that is, _c-char_ is in the range 0x0-0x7F, inclusive).

3. UTF-16 character literal, e.g. u'猫', but not u'🍌' (u'**\U0001f34c**'). Such literal has type char16_t and the value equal to ISO 10646 code point value of _c-char_, provided that the code point value is representable with a single UTF-16 code unit (that is, _c-char_ is in the range 0x0-0xFFFF, inclusive).

4. UTF-32 character literal, e.g. U'猫' or U'🍌'. Such literal has type char32_t and the value equal to ISO 10646 code point value of _c-char_.

5. Wide character literal, e.g. L'β' or L'猫'. Such literal has type wchar_t and the value equal to the value of _c-char_ in the execution wide character set.

6. Ordinary multicharacter literal, e.g. 'AB', is conditionally-supported, has type int and implementation-defined value.

7. Wide multicharacter literal, e.g. L'AB', is conditionally-supported, has type wchar_t and implementation-defined value.

### **Non-encodable characters**

In (1), if _c-char_ is not a numeric character sequence and is not representable as a single byte in the execution character set, the character literal is conditionally supported, has type int and implementation-defined value.

In (2-4), if _c-char_ is not a numeric character sequence and cannot be represented as a single code unit in the associated character encoding, the character literal is ill-formed.

In (5), if _c-char_ is not a numeric character sequence and is not representable as a single code unit in the execution wide character set (e.g. a non-BMP value on Windows where wchar_t is 16-bit), the character literal is conditionally supported, has type wchar_t and implementation-defined value.

### **Numeric escape sequences**

Numeric (octal and hexadecimal) escape sequences can be used for specifying the value of the character.

If the character literal contains only one numeric escape sequence, and the value specified by the escape sequence is representable by the unsigned version of its type, the character literal has the same value as the specified value (possibly after conversion to the character type).

A UTF-N character literal can have any value representable by its type. If the value does not correspond to a valid Unicode code point, or if the its corresponding code point is not representable as single code unit in UTF-N, it can still be specified by a numeric escape sequence with the value. E.g. u8'**\xff**' is well-formed and equal to char8_t(0xFF).

If the value specified by a numeric escape sequence used in a ordinary or wide character literal with one _c-char_ is representable by the unsigned version of the underlying type of char or wchar_t respectively, the value of the literal is the integer value of that unsigned integer type and the specified value converted to the type of the literal. Otherwise, the program is ill-formed.

If the value specified by a numeric escape sequence used in a UTF-N character literal is not representable by the corresponding `charN_t`, the value of the character literal is implementation-defined (until C++17)the program is ill-formed (since C++17).

### **Notes**

Multicharacter literals were inherited by C from the B programming language. Although not specified by the C or C++ standard, most compilers (MSVC is a notable exception) implement multicharacter literals as specified in B: the values of each char in the literal initialize successive bytes of the resulting integer, in big-endian zero-padded right-adjusted order, e.g. the value of '**\1**' is 0x00000001 and the value of '**\1\2\3\4**' is 0x01020304.

In C, character constants such as 'a' or '**\n**' have type int, rather than char.

```cpp
#include <cstdint>
#include <iomanip>
#include <iostream>
#include <string_view>

template <typename CharT>
void dump(std::string_view s, const CharT c) {
    const uint8_t* data {reinterpret_cast<const uint8_t*>(&c)};
    std::cout << "'" << s << "' \t" << std::hex
              << std::uppercase << std::setfill('0');
    for (auto i {0U}; i != sizeof(CharT); ++i){
        std::cout << std::setw(2) << static_cast<unsigned>(data[i]) << ' ';
    }
    std::cout << '\n';
}

void print(std::string_view str) { std::cout << str; }

int main()
{
    print("literal hex dump \n"
          "─────── ───────────\n");

    dump("a", 'a');
    dump("🍌", '🍌'); // implementation-defined
    print("\n");

    // ordinary multi-character literal
    dump("ab", 'ab'); // implementation-defined
    print("\n");

    // UTF-16 character literals
    char16_t uc1 = u'a'; dump("a", uc1);
    char16_t uc2 = u'¢'; dump("¢", uc2);
    char16_t uc3 = u'猫'; dump("猫", uc3);
    //  char16_t uc4 = u'🍌'; dump("🍌", uc4); // error: 🍌 maps to two UTF-16 code units
    print("\n");

    // UTF-32 character literals
    char32_t Uc1 = U'a'; dump("a", Uc1);
    char32_t Uc2 = U'¢'; dump("¢", Uc2);
    char32_t Uc3 = U'猫'; dump("猫", Uc3);
    char32_t Uc4 = U'🍌'; dump("🍌", Uc4);
    print("\n");

    // wide character literals
    wchar_t wc1 = L'a'; dump("a", wc1);
    wchar_t wc2 = L'¢'; dump("¢", wc2);
    wchar_t wc3 = L'猫'; dump("猫", wc3);
    wchar_t wc4 = L'🍌'; dump("🍌", wc4);
}
```

Possible output:

```text
literal hex dump
─────── ───────────
'a'     61
'🍌'    8C 8D 9F F0

'ab'    62 61 00 00

'a'     61 00
'¢'     A2 00
'猫'    2B 73

'a'     61 00 00 00
'¢'     A2 00 00 00
'猫'    2B 73 00 00
'🍌'    4C F3 01 00

'a'     61 00 00 00
'¢'     A2 00 00 00
'猫'    2B 73 00 00
'🍌'    4C F3 01 00
```
