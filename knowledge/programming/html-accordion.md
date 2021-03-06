---
title: Simple HTML Accordion
date: 2022-06-05T12:00
tags: html,css
description: Simple accordion with plain HTML
---

# Simple HTML Accordion

- [Simple HTML Accordion](#simple-html-accordion)
  - [Required code](#required-code)
  - [Result](#result)

This is an example on how to implement a simple accordion with plain HTML.

## Required code

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            .accordion {
                width: 500px;
                display: flex;
                flex-direction: column;
                font-family: sans-serif;

                --color: #ff2c00;
                --open-color: #fe9c34;
                --hover-color: #ff00008c;
            }

            .accordion details {
                border: 1px solid var(--color);
                margin-bottom: 5px;
                border-radius: 5px;
            }

            .accordion summary {
                background-color: var(--color);
                color: #211d1d;
                padding: 5px 10px;
                outline: none;
                cursor: pointer;
            }

            .accordion details:not([open]):hover {
                border-color: var(--hover-color);
            }

            .accordion details:not([open]) summary:hover {
                background-color: var(--hover-color);
            }

            .accordion details[open] {
                border-color: var(--open-color);
            }

            .accordion details[open] summary {
                background-color: var(--open-color);
            }

            .accordion main {
                padding: 5px 8px;
            }
        </style>
    </head>
    <body>
        <section class="accordion">
            <details>
                <summary>Lorem ipsum</summary>
                <main>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </main>
            </details>
            <details>
                <summary>Finibus Bonorum et Malorum I</summary>
                <main>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                    velit, sed quia non numquam eius modi tempora incidunt ut
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim
                    ad minima veniam, quis nostrum exercitationem ullam corporis
                    suscipit laboriosam, nisi ut aliquid ex ea commodi
                    consequatur? Quis autem vel eum iure reprehenderit qui in ea
                    voluptate velit esse quam nihil molestiae consequatur, vel
                    illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </main>
            </details>
            <details>
                <summary>Finibus Bonorum et Malorum II</summary>
                <main>
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores et quas molestias excepturi sint
                    occaecati cupiditate non provident, similique sunt in culpa
                    qui officia deserunt mollitia animi, id est laborum et
                    dolorum fuga. Et harum quidem rerum facilis est et expedita
                    distinctio. Nam libero tempore, cum soluta nobis est
                    eligendi optio cumque nihil impedit quo minus id quod maxime
                    placeat facere possimus, omnis voluptas assumenda est, omnis
                    dolor repellendus. Temporibus autem quibusdam et aut
                    officiis debitis aut rerum necessitatibus saepe eveniet ut
                    et voluptates repudiandae sint et molestiae non recusandae.
                    Itaque earum rerum hic tenetur a sapiente delectus, ut aut
                    reiciendis voluptatibus maiores alias consequatur aut
                    perferendis doloribus asperiores repellat.
                </main>
            </details>
        </section>
    </body>
</html>
```

## Result

The result we are trying to achieve is the following:

![HTML accordion example](/static/html-accordion/html-accordion-example.png)
