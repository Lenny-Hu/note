// 不推荐在head标签中使用阻塞渲染的JavaScript，或者在script标签上使用async和defer属性指示浏览器在下载脚本的同时渲染页面


// 访问整个文档 document.documentElement
// 访问body标签 document.body
// 访问某个元素的子节点 Element.childNodes <数组> 第一个子节点 Element.firstChild 最后一个子节点 Element.lastChild
// 访问特定的节点 document.getElementsByTagName('p')  getElementById('id') querySelector('.li') querySelectorAll('#id')
// 更多dom操作可使用jQuery这个框架


// 添加事件
document.body.addEventListener('click', function(event) {
    event.preventDefault(); // 阻止默认事件
    event.stopPropagation(); // 阻止冒泡
    console.log('点击body');
  }, false) // flase参数表示注册在冒泡阶段（由子向父），而不是捕获阶段（由父向子）
