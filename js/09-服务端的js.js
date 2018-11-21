// nodejs的事件循环：Node.js 在主线程里维护了一个事件队列，当接到请求后，就将该请求作为一个事件放入这个队列中，然后继续接收其他请求。当主线程空闲时(没有请求接入时)，就开始循环事件队列，检查队列中是否有要处理的事件，这时要分两种情况：如果是非 I/O 任务，就亲自处理，并通过回调函数返回到上层调用；如果是 I/O 任务，就从 线程池 中拿出一个线程来处理这个事件，并指定回调函数，然后继续循环队列中的其他事件。
// 当线程中的 I/O 任务完成以后，就执行指定的回调函数，并把这个完成的事件放到事件队列的尾部，等待事件循环，当主线程再次循环到该事件时，就直接处理并返回给上层调用。 这个过程就叫 事件循环 (Event Loop)。Node.js 被分为了四层，分别是 应用层、V8引擎层、Node API层 和 LIBUV层。无论是 Linux 平台还是 Windows 平台，Node.js 内部都是通过 线程池 来完成异步 I/O 操作的，而 LIBUV 针对不同平台的差异性实现了统一调用。因此，Node.js 的单线程仅仅是指 JavaScript 运行在单线程中，而并非 Node.js 是单线程。（https://www.cnblogs.com/onepixel/p/7143769.html）


// JS的事件循环：JS 在执行的过程中会产生执行环境，这些执行环境会被顺序的加入到执行栈中。如果遇到异步的代码，会被挂起并加入到 Task（有多种 task） 队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为。(http://www.ruanyifeng.com/blog/2014/10/event-loop.html)


// EventEmitter
const { EventEmitter } = require('events');
const emitter = new EventEmitter();
emitter.on('join', function(id, v) {
  console.log('监听到事件', id, v); // 监听到事件 1 2
})
emitter.emit('join', 1, 2);

// 模块
// 导出
module.exports = {
  fn: function() {},
  a: 1
}

// es6
export default {
  a: 1
}
export function a() {};

var b = 1;
export { b };

// 导入
var fs = require('fs');
// es6
import fs from 'fs';
