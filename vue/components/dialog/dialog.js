// 基本对话框结构（依赖jquery）
Vue.component('m-dialog', {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: '关闭'
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  template: '<div class="m-dialog-box" :class="className" v-if="show">' +
    '<div class="m-dialog-inner">' +
      '<div class="m-dialog-header" v-if="showHeader">' +
        '<h4>{{title}}</h4>' +
        '<span class="close" @click="close">x</span>' +
      '</div>' +
      '<div class="m-dialog-body">' +
        '<slot></slot>' +
      '</div>' +
      '<div class="m-dialog-footer f-tac" v-if="showFooter">' +
        '<a href="" class="btn" @click.prevent="close" v-if="!$slots.footer">{{btnText}}</a>' +
        '<slot name="footer"></slot>' +
      '</div>' +
    '</div>' +
  '</div>',
  data: function () {
    return {
    };
  },
  computed: {
    show: function () {
      var eventName = this.value ? 'open' : 'close';
      this.toggleClass();
      this.$emit(eventName);
      return this.value;
    }
  },
  methods: {
    close: function () {
      this.$emit('input', false);
    },
    toggleClass: function () {
      this.$nextTick(function () {
        var $html = $(document.documentElement);
        var count = $html.data('dialog-count') || 0;

        if (this.value) {
          count++;
          $html.addClass('m-dialog-open').data('dialog-count', count);
        } else {
          count && count--;
          if (count <= 0) {
            $html.removeClass('m-dialog-open');
          }
          $html.data('dialog-count', count);
        }
      });
    }
  },
  created: function () {
  }
});

// 使用
// <m-dialog :show-footer="false" v-model="show">
//  默认插槽
// </m-dialog>


// 加载loading插件
(function () {
  var ModuleLoading = Vue.extend({
    template: '<div class="m-loading-box" v-if="visible">' +
    '<div class="m-loading-inner">' +
      '<div class="m-loading-body f-tac">' +
        '<img src="load.gif" />' +
        '<div class="text f-toe" v-if="loadingText">{{loadingText}}</div>' +
      '</div>' +
    '</div>' +
  '</div>',
    data: function () {
      return {
        visible: false,
        loadingText: ''
      }
    },
    methods: {
      show: function (text) {
        this.loadingText = text || '加载中...';
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
        var instance = new ModuleLoading();
        instance.vm = instance.$mount();

        document.body.appendChild(instance.vm.$el);
        return instance.vm;
      })();
    }
  };

  $(function () {
    Vue.use(loadingPlugin);
  });
})();

// 使用
// this.$loading.show() || this.$loading.close()
