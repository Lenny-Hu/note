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
