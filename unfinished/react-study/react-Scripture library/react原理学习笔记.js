// reactJS的核心内容：
// 1、虚拟dom对象(Virtual DOM)
// 2、虚拟dom差异化算法(diff algorithm)
// 3、单向数据流渲染(Data Flow)
// 4、组件生命周期
// 5、事件处理

/******************
*    虚拟dom对象   *
*******************/

// 1、文本节点

//创建虚拟文本对象的构造函数
function ReactDOMTextComponent(text){}
// 结构
class VirtualTextComponent {
  _currentElement // 文本内容
  _rootNodeID // 存在于虚拟DOM的ID
  mountComponent() // 渲染成真正的dom节点

  receiveComponent() //更新节点
}


// 2、基本元素节点

// 虚拟dom的概念，就像最原始的元素
class ReactElement {
  type  // 元素类型
  key   // 标识这个元素
  props // 元素的属性，如组件的属性、子组件等
}

// 创建虚拟基本元素对象的构造函数
function ReactDOMComponent(element){}
// 结构
class VirtualHTMLComponent {
  _currentElement // 虚拟元素，即ReactElment
  _rootNodeID // 存在于虚拟DOM的ID
  _renderedChildren // 保存所有的子节点的component实例
                    // 是一个数组
                    // 其中每个子节点实例有_mountIndex属性,用来标记位置

  mountComponent(rootID) // 渲染成真正的dom节点
  receiveComponent() // 更新节点
  _updateDOMProperties(lastProps, nextProps) // 更新属性
  _updateDOMChildren(nextElement.props.children) // 更新子节点
  _diff(diffQueue, nextChildrenElements) //用来递归找出差别
                                         // 添加到更新队列diffQueue
  _patch(diffQueue) // 将差异对象插入到真正的dom节点上
}

var UPDATE_TYPES = {
  MOVE_EXISTING: 1, // 子节点内容不变，只是位置改变
  REMOVE_NODE: 2, // 删除节点
  NSERT_MARKUP: 3 // 插入节点
}
function flattenChildren(componentChildren) {} // 将componentChildren转换成一个map
function generateComponentChildren(prevChildren, nextChildrenElements) {} //
                                  // nextChildrenElements 是props.children
function insertChildAt(parentNode, childNode, index) // 将childNode插入到指定位置



// 3、自定义元素节点


// 为所有自定义组件的超级父类
class ReactClass {
  componentWillMount()
  componentDidMount()
  render()
  setState(newState)
  shouldComponentUpdate
}
// 留给子类去继承覆盖
// 执行render之后得到的是一个元素对象，即_currentElement
ReactClass.prototype.render = function(){}
// 设置新的newState
ReactClass.prototype.setState = function(newState){}


// 创建虚拟自定义对象的构造函数
function ReactCompositeComponent(element){}
// 结构
class VirtualCustomComponent {
  _currentElement // 存放当前元素对象的引用
  _rootNodeID // 存在于虚拟DOM的ID

  // 存放对应的ReactClass的实例，即继承的父类,
  // 拥有上面的方法
  _instance : {
    state
    _reactInternalInstance // this，指向VirtualCustomComponent
  }
  _renderedComponent // 由instantiateReactComponent创建的一个虚拟dom对象
                     // 带入的参数为this._instance.render()后的结果
                     // 是一个虚拟dom节点

  receiveComponent() // 实现更新
  _instantiateReactComponent()
}


// 组件工厂 , 用来返回需要构建的是一个怎样的虚拟dom对象
// 组件类型（文本、基本元素、自定义元素）
function instantiateReactComponent(node){}

// 判断两个element需不需要更新
function _shouldUpdateReactComponent(prevElement, nextElement){}
