import html from '../core.js'
import { connect } from '../store.js'

const connector = connect()

function App({ cars }) {
    return html`
        <ul>
            ${cars.map((car) => (
                `<li>${car}</li>`
            ))}
        </ul>

        <button onclick="dispatch('ADD', 'Porsche')">Add car</button>
    `
}

export default connector(App)
/**
 *  - connect() return một hàm --> khi gán connector = connect() nghĩa là
 *  đang gán connector = hàm được connect() return lại --> mà hàm được
 *  connect() return lại nhận vào đối số là một component --> ở dòng
 *  export default truyền vào connector() component App
 */