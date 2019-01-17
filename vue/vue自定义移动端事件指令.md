### 背景

> 在移动端的一个活动页面，需要用到左右滑动和点击，于是想到用自定义指令来实现简单的库

### 思路

> 使用touchstart、touchend、touchmove三个事件[兼容性查看](https://caniuse.com/#search=touchstart)，在touch start开始后，获取事件对象的x y坐标缓存，touchend时判断滑动方向。

```
function vueTouch(el, binding, type) { //触屏函数
  var _this = this;
  this.obj = el;
  this.binding = binding;
  this.touchType = type;
  this.vueTouches = { x: 0, y: 0 }; //触屏坐标
  this.vueMoves = true;
  this.vueLeave = true;
  this.vueCallBack = typeof (binding.value) == "object" ? binding.value.fn : binding.value;
  this.obj.addEventListener("touchstart", function (e) {
    _this.start(e);
  }, false);
  this.obj.addEventListener("touchend", function (e) {
    _this.end(e);
  }, false);
  this.obj.addEventListener("touchmove", function (e) {
    _this.move(e);
  }, false);
}
vueTouch.prototype = {
  start: function (e) { //监听touchstart事件
    this.vueMoves = true;
    this.vueLeave = true;
    this.longTouch = true;
    this.vueTouches = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };
    this.time = setTimeout(function () {
      if (this.vueLeave && this.vueMoves) { // 触摸后长达1秒后，没有移动，视为长按
        this.touchType == "longtap" && this.vueCallBack(this.binding.value, e);
        this.longTouch = false;
      }
    }.bind(this), 1000);
  },
  end: function (e) { //监听touchend事件
    var disX = e.changedTouches[0].pageX - this.vueTouches.x;//计算移动的位移差
    var disY = e.changedTouches[0].pageY - this.vueTouches.y;
    clearTimeout(this.time);
    if (Math.abs(disX) > 10 || Math.abs(disY) > 100) { //当横向位移大于10，纵向位移大于100，则判定为滑动事件
      this.touchType == "swipe" && this.vueCallBack(this.binding.value, e); //若为滑动事件则返回
      if (Math.abs(disX) > Math.abs(disY)) { //判断是横向滑动还是纵向滑动
        if (disX > 10) {
          this.touchType == "swiperight" && this.vueCallBack(this.binding.value, e);//右滑
        }
        if (disX < -10) {
          this.touchType == "swipeleft" && this.vueCallBack(this.binding.value, e);//左滑
        }
      } else {
        if (disY > 10) {
          this.touchType == "swipedown" && this.vueCallBack(this.binding.value, e);//下滑
        }
        if (disY < -10) {
          this.touchType == "swipeup" && this.vueCallBack(this.binding.value, e);//上滑
        }
      }
    } else {
      if (this.longTouch && this.vueMoves) { // 触摸后，没有移动，视为点击
        this.touchType == "tap" && this.vueCallBack(this.binding.value, e);
        this.vueLeave = false;
      }
    }
  },
  move: function () { //监听touchmove事件
    this.vueMoves = false;
  }
};
Vue.directive("tap", { //点击事件
  bind: function (el, binding) {
    new vueTouch(el, binding, "tap");
  }
});
Vue.directive("swipe", { //滑动事件
  bind: function (el, binding) {
    new vueTouch(el, binding, "swipe");
  }
});
Vue.directive("swipeleft", { //左滑事件
  bind: function (el, binding) {
    new vueTouch(el, binding, "swipeleft");
  }
});
Vue.directive("swiperight", { //右滑事件
  bind: function (el, binding) {
    new vueTouch(el, binding, "swiperight");
  }
});
Vue.directive("swipedown", { //下滑事件
  bind: function (el, binding) {
    new vueTouch(el, binding, "swipedown");
  }
});
Vue.directive("swipeup", { //上滑事件
  bind: function (el, binding) {
    new vueTouch(el, binding, "swipeup");
  }
});
Vue.directive("longtap", { //长按事件
  bind: function (el, binding) {
    new vueTouch(el, binding, "longtap");
  }
});

```

### 自定义指令简单的例子

> 定一个自定义点击事件的指令，还能调用组件属性`methods`中的方法。更多用法查看[自定义指令官方API文档](https://cn.vuejs.org/v2/guide/custom-directive.html)

```
<template>
  <div id="app">
    <button v-test="fn">test</button>
  </div>
</template>
<script>
  export default {
    directives: {
      test: {
        bind (ele, bind) {
          console.log(typeof bind.value); // function
          ele.addEventListener('click', (e) => {
            bind.value(e, '我是指令里的点击事件');
          }, false);
        },
        unbind (ele) {
          ele.removeEventListener('click');
        }
      }
    },
    methods: {
      fn (e, text) {
        console.log('test指令啊', e, text);
        this.get();
      },
      get () {
        console.log('获取数据');
      }
    }
  }
</script>

```
