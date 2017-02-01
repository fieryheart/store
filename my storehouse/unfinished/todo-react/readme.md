#TodoMVC-react学习笔记
## utils.js
><strong>1. app.Utils.uuid</strong>
```
        uuid: function () {
            var i, random;
            var uuid = '';
            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                    .toString(16);
            }
            return uuid;
        }
```  
>给每个todo一个id
>
><strong>2. app.Utils.pluralize</strong>
```
        pluralize: function (count, word) {
            return count === 1 ? word : word + 's';
        },
```
><font color="#00008B">&lt;footer&gt; -> &lt;span&gt; -> 判断是 'item' 或 'items' </font>
>
><strong>3. app.Utils.store</strong>
```
        store: function (namespace, data) {
            if (data) {
            return localStorage.setItem(namespace, JSON.stringify(data));
        }  
            var store = localStorage.getItem(namespace);
            return (store && JSON.parse(store)) || [];
        },
```
>本地存储

##从用户操作来看
> <strong>1.用户在 &lt;header&gt; -> &lt;input&gt; 中输入值(value)</strong>
> 触发 <font color="#00008B">app.jsx -> TodoApp组件 -> handleNewChange</font> 事件；
> 值(value)赋给 <font color="#00008B">TodoApp组件 -> state -> newTodo</font>；
> 
> <strong>2.用户按下ENTER键</strong>
> 触发<font color="#00008B">app.jsx -> TodoApp组件 -> handleNewTodoKeyDown</font>事件；
> 执行<font color="#00008B">todoModel.js -> app.TodoModel.addTodo</font>方法；
> 
>指令形式： Controller -> Model

.
>