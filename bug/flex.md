### 问题描述
> 在火狐浏览器下，使用flex布局（Y方向），两个容器A和B，A定高，B占满剩下的高度，同时设置`overflow：auto`，当B容器内的子元素的内容高度大于B容器时，overflow失效（没有滚动条）
### 原因
> 在firefox下，flex元素默认将其最小尺寸设置为其子元素的尺寸，这意味着父元素永远能显示全部子元素，即使这样导致整个页面超过了屏幕。这还overflow个鬼嘛！。因此我们需要覆盖默认的最小尺寸。
### 解决方法
> 给该元素添加min-height: 0或者min-width: 0，取决于你的滚动方向，如果无效，尝试给其父元素添加该style，以此类推。
### 参考
- https://www.jianshu.com/p/de06328eaa44
- https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes
---
