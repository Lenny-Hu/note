// 混合插件
(function () {
  var mixin = {
    data: function () {
      // 一些数据
    },
    methods: {
      // 获取随机数，在两个数之间（含）
      getRandomIntInclusive: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }
  };

  var mixinPlugin = {
    install: function (Vue) {
      Vue.prototype.$mixins = new Vue({
        mixins: [mixin]
      });
    }
  };

  Vue.use(mixinPlugin);
})();

// 使用
// this.$mixins.getRandomIntInclusive(1, 100);
