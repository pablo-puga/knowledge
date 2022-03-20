---
title: Decoding HTML Entities in JavaScript
date: 2022-03-17T10:40
tags: programming,javascript,typescript
---

# Decoding HTML Entities in JavaScript

There is no built-in function to perform this operation so we can get the job done by appending the text to a virtual textarea and getting its value back.

```ts
const decodeHtml = (html: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
};
```
