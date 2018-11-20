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


// 工厂模式
// 目的：
// 1.在创建相似对象时，抽象出重复出现的操作
// 2.让用户无需知道对象创建内部细节的情况下创建对象
// 工厂构造函数
function CarFactory() {
  this.title = '特斯拉';
}
CarFactory.prototype.info = function() {
  console.log(`这辆车有${this.doors}扇门，发动机排量为${this.engine_capacity}`);
}

// 定义各个类型车辆默认的构造函数，用于初始化不同类型的车辆属性
CarFactory.Compact = function() {
  this.doors = 4;
  this.engine_capacity = 2;
}
CarFactory.Sedan = function() {
  this.doors = 2;
  this.engine_capacity = 2;
}
CarFactory.SUV = function() {
  this.doors = 4;
  this.engine_capacity = 6;
}

// 静态工厂方法
CarFactory.make = function(type) {
  var constr = type;
  var car;
  CarFactory[constr].prototype = new CarFactory();
  // 创建新的实例
  car = new CarFactory[constr](); // new操作时，使用的是下方不同类型车辆的不同构造函数
  return car;
}

// 调用
var golf = CarFactory.make('Compact');
var vento = CarFactory.make('Sedan');
var touareg = CarFactory.make('SUV');
golf.info(); // 这辆车有4扇门，发动机排量为2
vento.info(); // 这辆车有2扇门，发动机排量为2
touareg.info(); // 这辆车有4扇门，发动机排量为6
console.log(touareg.title, golf.title, vento.title); // 特斯拉 特斯拉 特斯拉



// mixin模式：将共享的功能放到mixin中去，降低共享行为的重复数量，有助于重用。
// 在原型继承中，如果继承来自原型，那么对原型做出的修改会影响到从原型中继承的一切内容，如不希望出现这种情况，使用mixin
// 将共享功能装进CustomLogger
var logger = (function() {
  var CurstomLogger = {
    log: function(msg) {
      console.log(msg);
    }
  };
  return CurstomLogger;
}());

// 需要定制的日志记录器
var Server = (function() {
  var CurstomLogger = function() {
    this.init = function() {
      console.log('init...');
    }
  }

  // 将共享的功能复制到原型上
  CurstomLogger.prototype = Object.assign(CurstomLogger.prototype, logger); // 好像这个是浅拷贝
  return CurstomLogger;
}(logger));

var s = new Server();
s.init(); // init...
s.log('123'); // 123


// 装饰器模式：使用一个空白对象展开设计，该对象有一些基本的功能，随着设计的深入，可使用现有的装饰器来增强该空白对象。
// 通过列表实现的方式，不依赖继承或者方法调用链，简洁，目前主流的方式。
// 实现最小化的basicserver
function BasicServer() {
  this.pid = 1;
  console.log('initializing basic server');
  this.decorators_list = []; // 空的装饰器列表
}
// 定义空白的装饰器对象
BasicServer.decorators = {};
BasicServer.decorators.reverseProxy = {
  init: function(pid) {
    console.log('started reverse proxy');
    return pid + 1;
  }
};
BasicServer.decorators.servePHP = {
  init: function(pid) {
    console.log('started serving PHP');
    return pid + 1;
  }
};
BasicServer.decorators.serveNode = {
  init: function(pid) {
    console.log('started serving node');
    return pid + 1;
  }
};

// 每次调用decorate时，将装饰器添加到列表
BasicServer.prototype.decorate = function(decorate) {
  this.decorators_list.push(decorate);
}

// 该方法遍历装饰器列表，并执行每个装饰器上的init方法
BasicServer.prototype.init = function() {
  var running_processes = 0;
  var pid = this.pid;
  for (var i = 0; i < this.decorators_list.length; i++) {
    var name = this.decorators_list[i];
    running_processes = BasicServer.decorators[name].init(pid);
  }
  return running_processes;
}

// 创建PHP服务器
var phpServer = new BasicServer();
phpServer.decorate('reverseProxy');
phpServer.decorate('servePHP');
var phpTotal = phpServer.init();
console.log(phpTotal); // 2

// 创建node服务器
var nodeServer = new BasicServer();
nodeServer.decorate('reverseProxy');
nodeServer.decorate('serveNode');
var nodeTotal = nodeServer.init();
console.log(nodeTotal); // 2



// 观察者模式
// 对目标状态感兴趣的一个或者多个观察者，通过将自身与该目标关联在一起的形式进行注册。当目标出现
// 观察者可能感兴趣的变化时，发出提醒消息（通过广播），进而调用每个观察者的更新方法。如观察者对目标不再感兴趣，解除关联即可
// 目标（subject）：保存观察者列表，拥有可以添加、删除和更新观察者的方法
// 观察者（observer）：为那些需要在目标状态发生变化时得到提醒的对象提供接口
// 目标：
var Subject = (function() {
  function Subject() {
    this.observer_list = [];
  }
  // 添加观察者
  Subject.prototype.add_observer = function(obj) {
    this.observer_list.push(obj);
    console.log('添加观察者');
  }

  // 删除观察者
  Subject.prototype.rm_observer = function(obj) {
    for (let i = 0; i < this.observer_list.length; i++) {
      const element = this.observer_list[i];
      if (obj === element) {
        this.observer_list.splice(i, 1);
        console.log('删除观察者');
      }
    }
  }

  // 发送通知
  Subject.prototype.notify = function() {
    var args = Array.prototype.slice.call(arguments, 0); // 将参数转为真正的数组
    for (let i = 0; i < this.observer_list.length; i++) {
      this.observer_list[i].update(args);
    }
  }
  return Subject;
})();

// 实际使用例子
function Tweeter() {
  var subject = new Subject();
  this.addObsever = function(obj) {
    subject.add_observer(obj);
  };
  this.rmObsever = function(obj) {
    subject.rm_observer(obj);
  };
  this.fetchTweets = function fetchTweets() {
    // tweet
    var tweet = {
      tweet: '推特内容'
    };
    subject.notify(tweet); // 状态改变时，发送通知给观察者
  }
}

// 添加两个观察者，update方法由subject的notify方法调用
var TweeterUpdater = {
  update: function() {
    console.log('观察者1收到通知了', arguments);
  }
};
var TweeterFollower = {
  update: function() {
    console.log('观察者2收到通知了', arguments);
  }
};

var tweetAPP = new Tweeter();
tweetAPP.addObsever(TweeterUpdater); // 添加观察者
tweetAPP.addObsever(TweeterFollower); // 添加观察者
tweetAPP.fetchTweets(); // 观察者1收到通知了 { '0': [ { tweet: '推特内容' } ] } 观察者2收到通知了 { '0': [ { tweet: '推特内容' } ] }
tweetAPP.rmObsever(TweeterUpdater); // 删除观察者
tweetAPP.rmObsever(TweeterFollower); // 删除观察者
