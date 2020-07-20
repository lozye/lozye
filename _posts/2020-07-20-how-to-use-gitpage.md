---
layout: post
title: How to use Gitpage
tags: gitpage jekyll
---

### jekyll 目录结构

[官方文档](https://jekyllrb.com/docs/structure/)

其中主要目录 `_layouts`,`_posts`
+ `_layouts` 作为模板目录，模板名称就是文件名，如`post.html`模板名称就是`post`
+ `_posts` 作为文章目标，一个特殊点是文件名必须按 `yyyy-MM-dd-{name}.md`命名


### jekyll 文章关键字

[官方文档](https://jekyllrb.com/docs/posts/)

```
---
layout: post
title:  "Welcome to Jekyll!"
tags: classic hollywood
---
```

+ `layout` 模板选择
+ `title` 标题
+ `tags` 标签，其中`classic hollywood`将被处理为条目数组`["classic", "hollywood"]`


### jekyll 模板关键字及渲染
```html
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
      <!-- 摘要 -->
    </li>
  {% endfor %}
</ul>
```



