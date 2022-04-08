---
title: Decoding HTML Entities in JavaScript/TypeScript
date: 2022-03-17T10:40
lastUpdated: 2022-04-08T07:00
tags: programming,javascript,typescript
description: Quick method to decode HTML entities in JavaScript/Typescript
---

# Decoding HTML Entities in JavaScript/TypeScript

There is no built-in function to perform this operation so we can get the job done by appending the text to a virtual textarea and getting its value back.

```ts numbers=yes
const decodeHtml = (html: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
};
```
