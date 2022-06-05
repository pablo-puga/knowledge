---
title: HTML custom element
date: 2022-06-05T12:25
tags: html,css,js
description: Example on how to create a custom HTML element.
---

# HTML custom element

- [HTML custom element](#html-custom-element)
  - [Required code](#required-code)
    - [JavaScript definition of the element](#javascript-definition-of-the-element)
    - [HTML usage](#html-usage)
  - [Final result](#final-result)

Example of how to implemente a custom HTML element. For this example we are going to try to create a circle.

## Required code

### JavaScript definition of the element

First, we need to define the element through javascript.

```js numbers=yes
// shape.js
class Circle extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(document.createElement('style'));
        shadow.appendChild(document.createElement('div'));
    }

    static get observedAttributes() {
        return ['color', 'radius'];
    }

    connectedCallback() {
        this.updateStyle();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateStyle();
    }

    updateStyle() {
        let radius = parseInt(this.getAttribute('radius') || 10);
        let color = this.getAttribute('color') || 'transparent';
        this.shadowRoot.childNodes.forEach((child) => {
            if (child.nodeName === 'STYLE') {
                child.textContent = `
                    div {
                        background-color: ${color};
                        height: ${radius * 2}px;
                        width: ${radius * 2}px;
                        border-radius: 50%;
                    }
                `;
            }
        });
    }
}

customElements.define('shape-circle', Circle);
```

### HTML usage

Then we can import our element from the HTML and use it like a native tag.

```html numbers=yes
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <script src="shapes.js"></script>
        <style>
            shape-circle {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        </style>
    </head>
    <body>
        <shape-circle color="#42f4ce" radius="200"></shape-circle>
    </body>
</html>
```

## Final result

This is an example of the final result

![HTML custom element](/static/html-custom-element/html-custom-element-example.png)
