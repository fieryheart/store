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
>本地存储，store为一个数组
>
><strong>4. app.Utils.extend</strong>
```
        extend: function () {
            var newObj = {};
            for (var i = 0; i < arguments.length; i++) {
                var obj = arguments[i];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        newObj[key] = obj[key];
                    }
                }
            }
            return newObj;
        }
```
>将多个对象合成一个新的对象
##todoModel.js
><strong>Model层，模式：事件订阅通知</strong>
```
    app.TodoModel = function (key) {
        this.key = key;
        this.todos = Utils.store(key);
        this.onChanges = [];
    };
```
>key: 用户输入数据
>todos: 所有数据的集合
>onChanges: app中事件的集合，如 <font color="#00008B">app.jsx -> model.subscribe(render)</font>订阅渲染
>
```
    app.TodoModel.prototype.subscribe = function (onChange) {
        this.onChanges.push(onChange);
    };
```
>subscribe: app中事件订阅
>
```
    app.TodoModel.prototype.inform = function () {
        Utils.store(this.key, this.todos);
        this.onChanges.forEach(function (cb) { cb(); });
    };
```
>inform: 消息发布；消息是app中出现的每一个改变；所有数据重新存储；所有事件执行一遍
>
```
    app.TodoModel.prototype.addTodo = function (title) {
        this.todos = this.todos.concat({
            id: Utils.uuid(),
            title: title,
            completed: false
        });
        this.inform();
    };
```
>

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