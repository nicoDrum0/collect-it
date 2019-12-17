import { EventEmitter } from 'events'
// 组件事件中心
EventEmitter.defaultMaxListeners = 0
export default new EventEmitter()
