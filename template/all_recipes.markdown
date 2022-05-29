---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
title: All Recipes
layout: page
permalink: /all_recipes.html
---

|Recipe|Categories
|-|-
{% for recipe in site.recipes %} | [{{ recipe.title }}]({{recipe.url}}) |  {% for tag in recipe.tags %}  [{{tag|capitalize}}]( tags/{{ tag }}.html ) {% endfor %} 
{% endfor %}
