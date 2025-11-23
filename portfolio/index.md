---
layout: default
title: "Portfolio"
---

<h1>Portfolio</h1>
<p>Selected research and projects at the intersection of AI, V2X, and energy systems.</p>

<ul class="post-list">
  {% assign items = site.portfolio | sort: 'date' | reverse %}
  {% for item in items %}
  <li>
    <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
    {% if item.tags %}
    <span class="post-list-meta">{{ item.tags | join: " • " }}</span>
    {% endif %}
  </li>
  {% endfor %}
</ul>
