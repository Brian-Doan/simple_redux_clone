export default function html([first, ...strings], ...values) {
    return values.reduce((acc, cur) => {
        return acc.concat(cur, strings.shift())
    }, [first])
    .filter(x => x && x !== true || x === 0)
    .join('')
}

export function createStore(reducer) {
    let state = reducer()
    /**
     *  - Map() là một object đặc biệt có thể được lặp qua
     *  - Map() cho phép đặt key là bất cứ dữ liệu gì trong Javascript
     */
    const roots = new Map()

    function render() {
        /**
         *  - Dùng Destructuring để lấy giá trị
         *  - Component là những thành phần chứa View của giao diện
         */
        for (const [root, component] of roots) {
            const output = component()

            root.innerHTML = output
        }
    }

    return {
        /**
         *  attach() dùng để nhận View và đẩy View vào <div id="root"></div>
         */
        attach(component, root) {
            // Dùng phương thức set() của object --> có key là root, value là component
            roots.set(root, component)
            render()
        },
        /**
         *  - connect() dùng để kết nối Store với View
         *  - Vì màn hình View chưa chắc cần tất cả dữ liệu trong Store --> cho connect() 
         *  nhận vào một hàm selector có đối số là state và trả về chính state đó. Selector
         *  giúp chúng ta lựa chọn một dữ liệu cụ thể nào đó trong Store. Nếu không truyền 
         *  selector thì nó sẽ lấy state làm giá trị mặc định
         */
        connect(selector = state => state) {
            return component => {
                return (props, ...args) => {
                    return component(Object.assign({}, props, selector(state), ...args))
                }
            }
        },
        /**
         *  - dispatch() dùng để kết nối các hành động diễn ra trên View tới Actions
         *  - Ban đầu, state = reducer(). Khi người dùng dispatch một action --> action
         *  được truyền vào hàm dispatch() --> bên trong dispatch() gọi hàm reducer()
         *  --> reducer() lại nhận vào state và action, nghĩa là nó sẽ dựa trên action
         *  để sửa lại state, và reduceer() sẽ return lại state mới
         *  - Khi state được update, nghĩa là Store cũng được update --> gọi hàm render()
         *  để sửa lại View
         */
        dispatch(action, ...args) {
            state = reducer(state, action, args)

            render()
        }
    }
}