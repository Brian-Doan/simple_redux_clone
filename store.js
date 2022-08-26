import { createStore } from "./core.js"
import reducer from './reducer.js'

const { attach, connect, dispatch } = createStore(reducer)

/**
 *  Đưa dispatch() ra phạm vi window (global)
 */
window.dispatch = dispatch

export {
    attach,
    connect
}