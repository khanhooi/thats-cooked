---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
title: Recipe Tags
layout: page
permalink: /recipe_tags.html
---
{% assign tags =  site.recipes | map: 'tags' | join: ','  | split: ',' | uniq | sort %}
{% for tag in tags %}
- [ {{ tag | capitalize  }} ]( tags/{{ tag }}.html )
{% endfor %}