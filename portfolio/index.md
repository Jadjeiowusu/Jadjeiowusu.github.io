---
layout: default
title: "Portfolio"
---

<h1>Portfolio</h1>
<p>Selected work in AI, V2X, etc.</p>

<hr />

<h2>Publications</h2>

<ul class="post-list">
  {% assign publications = site.portfolio | where: "kind", "publication" | sort: "date" | reverse %}
  {% if publications.size == 0 %}
    <p>No publications added yet. Add items in <code>_portfolio</code> with <code>kind: "publication"</code>.</p>
  {% endif %}
  {% for item in publications %}
  <li>
    <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
    {% if item.venue %}
      <span class="post-list-meta">{{ item.venue }}</span>
    {% elsif item.tags %}
      <span class="post-list-meta">{{ item.tags | join: " • " }}</span>
    {% endif %}
  </li>
  {% endfor %}
</ul>

<hr />

<h2>Projects</h2>

<ul class="post-list">
  {% assign projects = site.portfolio | where: "kind", "project" | sort: "date" | reverse %}
  {% if projects.size == 0 %}
    <p>No projects added yet. Add items in <code>_portfolio</code> with <code>kind: "project"</code>.</p>
  {% endif %}
  {% for item in projects %}
  <li>
    <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
    {% if item.tags %}
      <span class="post-list-meta">{{ item.tags | join: " • " }}</span>
    {% endif %}
  </li>
  {% endfor %}
</ul>

