# confetti-js

## 用法

```html
<!--引用js-->
<script src="./dist/index.js"></script>

<!--可选：默认是 body 节点-->
<div id="box" style="position: relative;width: 300px;height: 500px;"></div>
```

```js
(function() {
  var confetti = new Confetti({
    el: document.getElementById('box'), // 容器，默认是 body 节点
    width: 300, // 默认容器宽度
    height: 500,// 默认容器高度
    length: 30, // 纸屑数量
    duration: 6000,// 持续时长
    isLoop: true, // 是否循环
  });
})()
```

### API
```js
  confetti.setOptions({}) // 设置
  confetti.start() // 开始
  confetti.stop() // 暂停
  confetti.destroy() // 销毁
```

## 示例
[Demo](https://pengxiaotian.github.io/confetti-js)
