// 设计模式（可复用的面向对象软件的基础）：就是为已知且明晰的问题提供标准化解决方案的。可视为一种最佳实践，一种有价值的抽象，一种解决常见问题的模版
// 写出模块化、正确且可维护代码
// 1.模式为常见问题提供了行之有效的解决方案
// 2.模式旨在重用：它们具备通用型，适合各种问题
// 3.模式定义了词汇：模式是一种定义明确的结构，因而为解决方案提供了通用的基础，这使得大型团队在沟通时能够非常清晰表达各自的意图

/**
 * 创建型模式：该模式处理的是用于创建对象的各种机制。着眼于优化或更可控的对象创建机制。
 *  工厂方法
 *  抽象工厂
 *  建造者
 *  原型
 *  单例
 */

/**
 * 结构型模式：该模式考虑的是对象的组成以及对象之间的关系。意图将系统变化对整个对象关系所造成的影响降低到最小。
 *  适配器
 *  桥接
 *  组合
 *  装饰器
 *  外观
 *  享元
 *  代理
 */

/**
 * 行为型模式：该模式关注的是对象之间的依赖关系以及通信。
 *  解释器
 *  模版方法
 *  责任链
 *  命令
 *  迭代器
 *  中介者
 *  备忘录
 *  观察者
 *  状态
 *  策略
 *  访问者
 */



// 命名空间模式：命名空间能够减少全局变量的数量，有助于避免命名冲突。
// 命名空间的思路是为应用程序或库创建一个全局对象，将所有的其他对象和函数全部添加到该对象中，减少污染全局的几率。
// 单一全局对象
var CARFACTORY = CARFACTORY || {}; // 确保不存在的前提下才创建，确保不会覆盖别人的。
CARFACTORY.Car = function() {}; // 构造函数
CARFACTORY.BMW = function() {}; // 构造函数
CARFACTORY.engines = 1;
CARFACTORY.features = {
  seats: 6,
  airbags: 6
}


/**
 * 模块模式：将较大的程序分割成较小的部分，赋予其各自的命名空间。（JavaScript没有访问修饰符，只能使用函数作用域（闭包）强加这种概念）
 * 1.模拟类的概念，能在对象中添加公共/私有方法和变量，能够同全局作用域隔离开。
 * 2.变量和函数都被限制在模块的作用域中，避免了与使用相同名称的其他脚本产生冲突。
 * 3.暴露公共API，实现细节保留在模块的闭包中
 */
// iife模式
var basicServerConfig = (function() {
  var enviroment = 'production';
  var startupParams = {
    cacheTimeout: 30,
    locale: 'en_us'
  };
  return {
    init: function() {
      console.log('initializing the server!');
    },
    updateStartup: function(params) { // 此处省略了对默认参数的处理代码
      this.startupParams = params;
      console.log(this.startupParams);
    }
  }
})();
basicServerConfig.init(); // initializing the server!
basicServerConfig.updateStartup({ cacheTimeout: 60, locale: 'en_uk' }); // { cacheTimeout: 60, locale: 'en_uk' }
// 单一全局对象模式
var SERVER = SERVER || {};
SERVER.basicServerConfig = (function() {
  var enviroment = 'production';
  var startupParams = {
    cacheTimeout: 30,
    locale: 'en_us'
  };
  return {
    init: function() {
      console.log('initializing the server!');
    },
    updateStartup: function(params) { // 此处省略了对默认参数的处理代码
      this.startupParams = params;
      console.log(this.startupParams);
    }
  }
})();
SERVER.basicServerConfig.init(); // initializing the server!
SERVER.basicServerConfig.updateStartup({ cacheTimeout: 60, locale: 'en_uk' }); // { cacheTimeout: 60, locale: 'en_uk' }

// 暴露式模块模式（RMP）
// 经典字面量写法
var modulePattern = function() {
  var privateOne = 1;

  function privateFn() {
    console.log('private fn');
  }
  return {
    publicTwo: 2,
    publicFn: function() {
      modulePattern.publicTwo();
    },
    publicTwo: function() {
      privateFn();
    }
  }
}();
modulePattern.publicFn(); // private fn
// 改写成RMP，函数和变量是在私有作用域中定义的，做法更为清晰，优先采用
var revealingExample = function() {
  var privateOne = 1;

  function privateFn() {
    console.log('private fn called');
  }
  var publicTwo = 2;

  function publicFn() {
    fPublicTwo();
  }

  function fPublicTwo() {
    privateFn();
  }

  function getCurrentState() {
    return 2;
  }
  // 通过分配共有指针来暴露私有变量
  return {
    setup: publicFn,
    count: publicTwo,
    increaseCount: fPublicTwo,
    current: getCurrentState()
  };
}();
console.log(revealingExample.current); // 2
revealingExample.setup(); // private fn called

// 标准化方法创建模块
// 1.commonJS：nodejs使用，使用require加载模块，使用module.exports导出模块，浏览器端使用curl.js支持
var fs = require(fs); // 导入其他模块

function fn() {};
module.exports = fn; // 供其他模块使用
// 2.异步模块定义（AMD）：浏览器上使用的，使用define（）函数定义，接收一个模块名称数组和回调函数参数
define('name', // 模块名称
  ['sum'], // 依赖的模块
  function(sum) { // 模块定义函数，将依赖映射为参数
    var math = {
      demo: function() {
        console.log('打印sum', sum);
      }
    }
    return math;
  })

// 使用 (requireJS是AMD模块装载器之一)
// require(['math', 'draw'], function(math, draw) {
//   draw .2 DRender(math.pi);
// })

// 没有任何依赖的模块
define({
  add: function(x, y) {
    return x + y;
  }
})


// es6模块
// a.js
function _fn() {};
var b = 1;
// export { fn as _fn, c as b, b };
export default {
  fn: _fn,
  b: b
}
// main.js
import a from 'a.js'
import { fn, b } from 'a.js'
console.log(a.fn);
console.log(a.b);
