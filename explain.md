# Cách vận hành của thư viện Clone
**1.** Đầu tiên sẽ đi vào file script.js, vì script.js được link trong HTML
**2.** Trong file script.js có import hàm attach từ file store.js (vì attach không được export default nên dùng Destructuring để import)
**3.**. attach() nhận đối số là Component và root là nơi chúng ta sẽ truyền Component vào đó
**4.**. attach() được lấy ra từ hàm createStore (hàm createStore return 3 hàm là attach, connect và dispatch). Logic của attach() như sau:
    *(i)* roots ban đầu là một object Map rỗng { }
    *(ii)* Từ roots, gọi phương thức set() --> truyền vào root làm key và Component làm value --> lúc này object roots đã có cặp key - value 
    *(iii)* Sau khi set() thì gọi hàm render() --> hàm render() lặp qua roots (roost là object Map có thể lặp qua được), nhận lại root và Component mà ta vừa set(). Thực chất, Component đang là App, mà App là một hàm --> khi const output = component() nghĩa là đang gọi hàm App, và gán kết quả trả về của App cho biến output
    *(iv)* Khi hàm App thực thi, nó có sử dụng cú pháp Tagged Template Literal, trong đó có gọi hàm html. Hàm html() được import từ file core.js
    *(v)* output được đưa vào root.innerHTML --> render Component App ra HTML
**5.**. Store là trung tâm chứa dữ liệu để render ra HTML nên ta sẽ xét nó trước. Trong file core.js có hàm createStore(). Hàm nhận đối số là reducer, mong muốn trong trường hợp mặc định thì reducer trả về giá trị khởi tạo để làm state ban đầu --> do đó trong file reducer.js ta có tạo một biến initValue làm giá trị khởi tạo, và gán state ban đầu của reducer = initValue. Trong lần đầu tiên, những Action chưa được thực hiện nên sẽ rơi vào case default và trả về state mặc định --> trong lần đầu tiên reducer() trả về initValue
**6.** Trong file App.js, ta có gọi tới hàm connect() (connect cũng được lấy ra từ createStore, được import vào từ file store.js)
**7.** Khi connect() thực thi, nó trả về một Arrow Function có đối số là một Component. Toàn bộ Arrow Function mà connect() trả về được gán cho biến connector --> lúc này connector cũng trở thành một hàm. Cho nên ở cuối file App.js, ta export default hàm connector và truyền vào Component App --> export default connector(App)
**8.** Khi connector thực thi, nó lại trả về một hàm mới. Hàm mới này sẽ chạy Component App và trả về một object được hợp nhất bởi props, state (và cả những đối số khác có thể truyền vào trong tương lai). Trong state đang có mảng cars, do đó Component App cũng nhận được cars thông qua state --> đây chính là cách truyền dữ liệu từ Store sang View.
**9.** Vì mảng cars đã được truyền vào Component App --> ta có thể map qua nó để lấy ra từng car, gọi hàm html() để xử lý việc nối chuỗi, sau đó return để render ra giao diện
**10.** Khi ta click vào <button> --> bắt sự kiện click và gọi hàm dispatch(). Hàm dispatch() nhận vào đối số là tên Action và value. Khi dispatch() chạy, nó lại gọi hàm reducer(), truyền vào giá trị state từ lần trước đó làm dữ liệu đầu vào. reducer() cũng nhận thêm Action và value từ dispatch(). Mà trong hàm reducer(), ta có case 'ADD' --> lấy ra value mới từ args, và dùng toán tử Spread để return lại object mới.
**11.** Sau khi reducer() xử lý xong case 'ADD', nó return lại state mới và gán state = state mới --> sau đó gọi hàm render() để tải lại giao diện. Hàm render() được gọi lại --> quay lại bước *4.(iii)*