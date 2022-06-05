---
title: HTML/CSS Multi-column layout
date: 2022-06-05T10:00
tags: html,css
description: HTML and CSS example of a multi-column layout
---

# HTML/CSS Multi-column layout

- [HTML/CSS Multi-column layout](#htmlcss-multi-column-layout)
  - [Required code](#required-code)
  - [Result](#result)

This is an example on how to implement a multi-column layout, similar to those of magazines and newspapers with plain HTML and CSS.

## Required code

```html
<html>
    <head>
        <style>
            html,
            body {
                width: 100%;
                height: 100%;
                margin: 0;
                font-family: sans-serif;
            }

            .lorem {
                max-width: 800px;
                margin: auto;
                column-count: 2;
                column-width: 300px;
                padding: 10px;
            }

            .lorem h1 {
                text-align: center;
                font-size: 2rem;
                column-span: all;
            }

            .lorem q {
                text-align: center;
                font-weight: bold;
                column-span: all;
                display: block;
                margin-top: 15px;
                margin-bottom: 15px;
                font-size: 1.3rem;
            }

            .lorem p {
                text-align: justify;
                margin-top: 0;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <article class="lorem">
            <h1>Lorem Ipsum</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                eget auctor dolor. Maecenas tellus quam, interdum lobortis elit
                bibendum, consectetur sagittis justo. In a orci convallis,
                pretium nunc eget, auctor felis. Integer sapien tellus, sagittis
                quis tincidunt ut, ullamcorper eu dui. Maecenas congue, leo nec
                elementum rutrum, sapien lacus porttitor dui, id tempor urna
                nisi nec libero. Pellentesque suscipit ultrices enim at porta.
                Donec libero felis, congue et ligula vitae, tincidunt commodo
                urna. Vestibulum maximus metus sed quam porta vulputate.
                Pellentesque id purus eu eros tristique laoreet in id urna. In
                facilisis congue malesuada. Morbi pharetra tempor magna sed
                semper. Maecenas vel mi id dui congue fringilla sit amet ac
                arcu. Proin non vestibulum est, a laoreet nisi. In hac habitasse
                platea dictumst.
            </p>
            <p>
                Nullam a leo vulputate, posuere est sit amet, sodales augue.
                Aenean tellus nulla, auctor nec pharetra sed, maximus eu turpis.
                Sed in malesuada magna. Aliquam erat volutpat. Quisque nec
                tempus orci. Sed sit amet ex quis ex tincidunt posuere in
                ullamcorper arcu. Praesent erat risus, ullamcorper eu volutpat
                id, consectetur eget sapien. Proin sodales tellus sit amet
                vestibulum malesuada. Vestibulum ante ipsum primis in faucibus
                orci luctus et ultrices posuere cubilia Curae; Etiam non
                vulputate purus. Morbi id faucibus mi. Nullam volutpat tortor
                eget eros lobortis sagittis. Donec eget sapien risus. Cras
                dapibus, leo a gravida feugiat, diam metus vestibulum lorem, at
                ultricies arcu tellus vel enim.
            </p>
            <p>
                Phasellus susciit purus tristique nulla bibendum, at porta urna
                fringilla. Aenean sapien nunc, malesuada id ex vel, malesuada
                tempor ex. Nunc fermentum vel dui vel ultrices. Nulla at
                interdum risus. Donec ut interdum nunc. Sed nec fringilla elit,
                at pretium mi. In cursus velit placerat nulla vulputate egestas.
                Duis accumsan, nulla ac ullamcorper lobortis, massa sapien porta
                ex, vel lacinia ante tellus ac tellus. Curabitur sed pretium
                dui. Nullam semper purus a sapien blandit, vel vulputate ex
                tempor. Suspendisse eu nisl metus. Integer vulputate, mauris id
                rutrum tempor, mi urna porttitor diam, vel pharetra magna sapien
                aliquam leo. Curabitur leo lectus, finibus et vulputate in,
                eleifend tempor augue. Quisque interdum velit dui, non
                consectetur erat auctor ut. Proin a magna sit amet ante accumsan
                gravida in vehicula dolor. Proin euismod sed sem a faucibus.
            </p>
            <q
                >Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit...</q
            >
            <p>
                Ut mollis tempus ornare. Etiam sit amet elementum nisl. Donec
                aliquet tristique lectus vel condimentum. Sed nec vulputate
                augue. Suspendisse porta maximus dignissim. Nulla porta leo
                augue, sed tempor eros consequat eu. Maecenas quis hendrerit
                est. Nunc a leo a tortor accumsan sagittis a eu sapien. Nulla
                efficitur tellus sit amet ipsum egestas eleifend. Nullam
                facilisis sodales mauris, ut tempor augue mattis non. Nulla
                semper suscipit est, a mattis tellus egestas id. Duis viverra
                dolor at nisi molestie finibus. Nulla vitae dapibus nisl.
            </p>
            <p>
                Maecenas ut neque sodales odio tincidunt pretium. Integer eget
                pharetra sapien. Suspendisse volutpat sit amet enim id varius.
                Curabitur interdum nibh diam, et finibus nisl efficitur at.
                Integer finibus feugiat risus in suscipit. Mauris ut purus
                gravida, rhoncus leo vel, cursus ex. Donec consequat magna et
                risus tincidunt facilisis. Mauris ornare rutrum diam id laoreet.
                Ut placerat porta orci, sit amet scelerisque lorem tempor et.
                Mauris convallis auctor ex ut semper. Mauris aliquet a ex in
                porta. In ut imperdiet nisi, placerat finibus neque. Nam aliquam
                vel lacus consequat rutrum.
            </p>
            <p>
                Sed lobortis ac nisl in luctus. Aenean finibus mauris eget
                tortor maximus bibendum. Mauris non velit a nisl dictum
                pulvinar. Phasellus nibh purus, accumsan sed elementum non,
                faucibus id lorem. Vivamus lorem lectus, malesuada sed metus ut,
                dictum finibus dolor. Morbi elementum hendrerit auctor. Donec
                elit nisl, pretium quis diam in, dignissim pellentesque nulla.
                Integer in erat nec dui semper auctor sed nec felis. Aenean a
                dapibus leo, a rhoncus lectus. Praesent eleifend nulla sit amet
                malesuada euismod. Aenean neque sem, rutrum quis dictum vitae,
                blandit vel quam. Nullam pharetra justo non fringilla aliquet.
                Sed sit amet mollis odio. Sed placerat orci eget nisi convallis,
                vel auctor urna rutrum.
            </p>
        </article>
    </body>
</html>
```

## Result

The result we are trying to achieve is the following:

![HTML/CSS Multi-column layout example](/static/css-multicol-layout/css-multicol-example.png)
