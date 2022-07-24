---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

![That's Cooked!](assets/thats-cooked.svg "That's Cooked")

|-|-|
| [All Recipes](/all_recipes.html) | [Categories](/categories.html) |


## What's New...
{% assign sorted = site.recipes | sort: 'date' | reverse  %}
{% for item in sorted limit:3%}
{%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
{{ item.date | date: date_format }}
[{{ item.title }}]( {{item.url}} ) - 
{{ item.description }}

<br>
{% endfor %}
