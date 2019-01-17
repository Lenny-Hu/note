### 背景

> 需要一个通用的消息提示组件，但是消息提示这种组件我更想用方法来调用，而不是在各个页面上都添加个组件，像这样（this.$message）

### Vue.extend是什么

> 一个类构造器，用来创建一个子类vue并返回构造函数，而Vue.component它的任务是将给定的构造函数与字符串ID相关联，以便Vue.js可以在模板中接收它 [官方API文档](https://cn.vuejs.org/v2/api/#Vue-extend)

### 实现步骤

首先我们先创建我们的提示组件的模板 `message.vue`

```
<template>
    <transition name="message-fade">
        <div class="message" v-show="show">
        <span class="icon"><icon name="info"></icon></span>
            <p>{{message}}</p>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'v-message',
        mounted(){
            this.StartTime();
        },
        data(){
            return {
                message: '123',
                show: false,
                timer: null
            }
        },
        methods:{
            StartTime(){
                this.show = true;
                if(this.timer){
                    clearTimeOut(this.timer)
                }else{
                    this.timer = setTimeout(()=>{
                        this.show = false
                    }, 3000);
                }
            }
        }
    }
</script>

```
之后我们需要用将message.vue传到Vue.extend()里 `main.js`

```
import Vue from 'vue';
let MessageBox = Vue.extend(require('./message.vue'));
let instance;
var message = function(options){
    if(typeof options === 'string'){
        options = {
            message: options
        }
    }
    //生成组件
    instance = new MessageBox({
        data: options
    })
    //组件需要挂载在dom元素上
    instance.vm = instance.$mount();
    //根据不同的类型，设置不同消息的背景颜色
    if(options.type){
        instance.vm.$el.children[0].className += ` icon__${options.type}`;
    }
    document.body.appendChild(instance.vm.$el);
    return instance.vm;
}

const type = ['success', 'info', 'warning', 'error'];
type.forEach((type)=>{
    message[type] = options =>{
        if(typeof options === 'string'){
            options = {
                message: options
            }
        }
        options.type = type;
        return message(options);
    }
})

export default message;

```

之后用挂在全局方法上,之后用this.$message()方法调用 `index.js`

```
export default {
  install: function (Vue) {
    vue.prototype.$message = message;
  }
}

```

使用

```
import Plugin from 'index.js'

Vue.use(Plugin);

```

### 简单例子

```
<div class="p-demo" id="app"></div>

<script type="text/x-template" id="tmp-loading">
  <div class="m-loading-box" v-if="visible">
    <div class="m-loading-inner">
      <div class="img-box">
        <img src="loading.gif" alt="">
      </div>
      <div class="loading-text s-fc-999">{{ loadingText || '加载中'}}</div>
    </div>
  </div>
</script>

<script>
var ModuleLoading = Vue.extend({
    template: '#tmp-loading',
    data: function () {
      return {
        visible: false,
        loadingText: ''
      }
    },
    methods: {
      show: function (text) {
        if (text) {
          this.loadingText = text;
        }
        this.visible = true;
      },
      close: function () {
        this.visible = false;
        this.loadingText = '';
      }
    }
  });
  var loadingPlugin = {
    install: function (Vue) {
      Vue.prototype.$loading = (function () {
        let instance = new ModuleLoading();
        instance.vm = instance.$mount();
        
        document.body.appendChild(instance.vm.$el);
        return instance.vm;
      })();
    }
  };
  
  Vue.use(loadingPlugin);

  var VM = new Vue({
    el: '#app',
    created: function () {
        this.$loading.show();
        this.$loading.close();
    }
  });
</script>



```

