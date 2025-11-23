---
layout: default
title: "Blog"
---

<h1>Blog</h1>
<p>Writing about AI, reinforcement learning, V2X, and the math behind modern ML systems.</p>

<ul class="post-list">
  {% for post in site.posts %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span class="post-list-meta">{{ post.date | date: "%b %d, %Y" }}</span>
  </li>
  {% endfor %}
</ul>
