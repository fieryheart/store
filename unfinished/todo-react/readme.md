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
>添加一个要做的事情；发布；
>
```
    app.TodoModel.prototype.toggleAll = function (checked) {
        this.todos = this.todos.map(function (todo) {
            return Utils.extend({}, todo, {completed: checked});
        });
        this.inform();
    };
```
>对所有的“事情”对象做同样的动作，即标记所有执行（完成/未完成）；发布；
>
```
    app.TodoModel.prototype.toggle = function (todoToToggle) {
        this.todos = this.todos.map(function (todo) {
            return todo !== todoToToggle ?
                todo :
                Utils.extend({}, todo, {completed: !todo.completed});
        });
        this.inform();
    };
```
>对一个“事情”对象执行动作；发布；
>
```
    app.TodoModel.prototype.destroy = function (todo) {
        this.todos = this.todos.filter(function (candidate) {
            return candidate !== todo;
        });
        this.inform();
    };
```
>销毁一个“事情”对象；发布；
>
```
    app.TodoModel.prototype.save = function (todoToSave, text) {
        this.todos = this.todos.map(function (todo) {
            return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
        });
        this.inform();
    };
```
>改变一个“事情”对象的text；发布；
>
```
    app.TodoModel.prototype.clearCompleted = function () {
        this.todos = this.todos.filter(function (todo) {
            return !todo.completed;
        });
        this.inform();
    };
```
>销毁所有完成了的“事情”对象；发布；
>
##todoItem.jsx
><strong>“事情”对象列表部分</strong>
><ul>
>    <li>展示“事情”对象</li>
>    <li>改变“事情”对象的completed</li>
>    <li>改变单个“事情”对象的text；销毁单个“事情”对象</li>
></ul> 
##footer.jsx
><strong>footer部分</strong>
><ul>
>    <li>筛选“事情”对象</li>
>    <li>销毁所有完成的“事情”对象</li>
></ul>
##用户操作
###界面输入
> <strong>1.用户在 &lt;header&gt; -> &lt;input&gt; 中输入值(value)</strong>
```
      handleChange: function (event) {
            this.setState({newTodo: event.target.value});
      },
```
> 触发 <font color="#00008B">app.jsx -> TodoApp组件 -> handleChange</font> 事件；
> 值(value)赋给 <font color="#00008B">TodoApp组件 -> state -> newTodo</font>；
> 
> <strong>2.用户按下ENTER键</strong>
```
        handleNewTodoKeyDown: function (event) {
            if (event.keyCode !== ENTER_KEY) {
                return;
            }
            event.preventDefault();
            var val = this.state.newTodo.trim();
            if (val) {
                this.props.model.addTodo(val);
                this.setState({newTodo: ''});
            }
        },
```
> 触发<font color="#00008B">app.jsx -> TodoApp组件 -> handleNewTodoKeyDown</font>事件；
> 执行<font color="#00008B">todoModel.js -> app.TodoModel.prototype.addTodo</font>方法；
> 
>指令形式： Controller -> Model

.
###标记所有
><strong>用户点击&lt;input class="toggle-all" /&gt;</strong>
```
        toggleAll: function (event) {
            var checked = event.target.checked;
            this.props.model.toggleAll(checked);
        },
```
>触发<font color="#00008B">app.jsx -> TodoApp组件 -> toggleAll</font>事件；
>得到当前&lg;input class="toggle-all" /&gt;中checked属性的值(true/false)，用来决定标记的“事情”对象；
>触发<font color="#00008B">todoModel.js -> app.TodoModel.prototype.toggleAll</font>方法；
>标记model中所有“事情”对象，执行完成/未完成；

.
###标记一个"事情"对象
><strong>用户点击&lt;input class="toggle" /&gt;</strong>
```
            var todoItems = shownTodos.map(function (todo) {
                return (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={this.toggle.bind(this, todo)}
                        onDestroy={this.destroy.bind(this, todo)}
                        onEdit={this.edit.bind(this, todo)}
                        editing={this.state.editing === todo.id}
                        onSave={this.save.bind(this, todo)}
                        onCancel={this.cancel}
                    />
                );
            }, this);
```
>shownTodos：当前展示的“事情”对象（根据已完成/未完成）；
>触发<font color="#00008B">app.jsx ->TodoApp组件 -> toggle</font>事件；
>触发<font color="#00008B">todoModel.js -> app.model.prototype.toggle</font>方法；

###改变一个“事情”对象的text
><strong>用户双击&lt;label&gt;</strong>
```
        <label onDoubleClick={this.handleEdit}>
            {this.props.todo.title}
        </label>
```
>触发<font color="#00008B">todoItem.jsx -> handleEdit</font>事件；
```
        handleEdit: function () {
            this.props.onEdit();
            this.setState({editText: this.props.todo.title});
        },
```
>触发<font color="#00008B">app.jsx -> edit</font>事件；
```
        edit: function (todo) {
            this.setState({editing: todo.id});
        },
```
>将state对象editing赋值为todo的id，即现在正在编辑的对象；
><font color="#00008B">&lt;TodoItem /&gt; -> title 赋给 todoItem.jsx -> app.TodoItem -> state -> editText</font>；
```
        <input
            ref="editField"
            className="edit"
            value={this.state.editText}
            onBlur={this.handleSubmit}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
        />
```
>item中出现输入框；
>this.handleSubmit、this.handleChange、this.handleKeyDown 与 TodoApp组件如出一辙；
>this.onSave：给当前“事情”对象改变text
>补充：通过给*&lt;div class="view"&gt;*加上`editing`实现`display: none`；

.
###销毁一个“事情”对象
><strong>用户点击&lt;button class="destory"&gt;</strong>
```
        <button className="destroy" onClick={this.props.onDestroy} />
```
>触发<font color="#00008B">app.jsx -> TodoItem组件 -> onDestroy -> TodoApp组件 -> destroy</font>事件；
```
        destroy: function (todo) {
            this.props.model.destroy(todo);
        },
```
>触发<font color="#00008B">todoModel.js -> app.model.prototype.destroy</font>方法；

.
###筛选“事情”对象
><strong>用户点击"All"、"Acitve"、"Completed"</strong>
```
                <footer className="footer">
                    <span className="todo-count">
                        <strong>{this.props.count}</strong> {activeTodoWord} left
                    </span>
                    <ul className="filters">
                        <li>
                            <a
                                href="#/"
                                className={classNames({selected: nowShowing === app.ALL_TODOS})}>
                                    All
                            </a>
                        </li>
                        {' '}
                        <li>
                            <a
                                href="#/active"
                                className={classNames({selected: nowShowing === app.ACTIVE_TODOS})}>
                                    Active
                            </a>
                        </li>
                        {' '}
                        <li>
                            <a
                                href="#/completed"
                                className={classNames({selected: nowShowing === app.COMPLETED_TODOS})}>
                                    Completed
                            </a>
                        </li>
                    </ul>
                    {clearButton}
                </footer>
```
>触发<font color="#00008B">footer.jsx -> &lt;footer className="footer"&gt; -> &lt;ul className="filter"&gt; -> &lt;a&gt; -> app.jsx -> componentDidMount -> Router</font>
```
        componentDidMount: function () {
            var setState = this.setState;
            var router = Router({
                '/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
                '/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
                '/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
            });
            router.init('/');
        },
```
>执行URL解析，跳转页面

.
##总结
><ul>
>    <li>ReactJS —— 一个注重于UI的框架</li>
>    <li>用户的行为有输入、改写、删除、筛选、标记、归零操作</li>
>    <li>app.jsx：Controller；展现给用户的操作，即用户发出的指令逻辑；整个app组件的集合；</li>
>    <li>todoModel.js：Model；用户发出指令后对数据的处理过程；订阅发布模式；</li>
>    <li>todoItem.jsx、footer.jsx：View；各个组件</li>
>    <li>utils.js：工具库</li>
>    <li>我的看法：将items组合的过程与app.jsx分开，实现View和Control分离</li>
></ul>