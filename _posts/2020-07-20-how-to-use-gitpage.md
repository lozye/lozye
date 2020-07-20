---
layout: post
title: HOW TO USE GITPAGE
tags: gitpage jekyll
---

GITPAGE使用了JEKYLL静态渲染页面，以下说明其中的目录结构与主要关键字

### jekyll 目录结构

[官方文档](https://jekyllrb.com/docs/structure/)

```
├── _config.yml
├── _layouts
│   ├── default.html
│   └── post.html
├── _posts
│   ├── 2007-10-29-why-every-programmer-should-play-nethack.md
│   └── 2009-04-26-barcamp-boston-4-roundup.md
└── index.html # can also be an 'index.md' 
```

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
  /% for post in site.posts %/
    <li>
      <a href="// post.url //">// post.title //</a>
      // post.excerpt //
      <!-- 摘要 -->
    </li>
  /% endfor %/
</ul>
```
由于模板引擎关系，以上 `/` 代替 `{`,`}`


