// 虚拟DOM对象
// 虚拟DOM差异化算法
// 单向数据流渲染
// 组件生命周期 componentWillMount、componentDidMount、shouldComponentUpdate、componentWillUpdate、componentDidUpdate、componentwillUnmount
// 事件处理

// component类，用来表示文本在渲染、更新、删除时应该做些什么事情
// 一个虚拟的文本节点
function ReactDOMTextComponent(text){
  //存下当前的字符串
  this._currentElement = '' + text;
  //id标识当前component
  this._rootNodeID = null;
}

// 文本节点的receiveComponent
ReactDOMTextComponent.prototype.receiveComponent = function(nextText) {
  var nextStringText = '' + nextText;
  // 跟以前保存的字符串比较
  if (nextStringText !== this._currentELement) {
    this._currentElement = nextStringText;
    // 替换整个节点
    $('[data-reactid="]' + this._rootNodeID + '"]').html(this._currentElement)
  }
}

// component渲染时生成的dom结构
// 将虚拟节点渲染成真正的dom节点awngyi
ReactDOMTextComponent.prototype.mountComponent = function(rootID){
  this._rootNodeID = rootID;
  return '<span data-reactid="' + rootID + '">' + this._currentElement + '</span>'
}


// component类,用来表示节点在渲染、更新、删除时应该做些什么事情
function ReactDOMComponent(element){
  // 存下当前的element对象引用
  this._currentElement = element;
  this._rootNodeID = null;
}

// 基本元素的更新，分为两个部分
// 1.属性的更新，包括对特殊属性比如事件的处理
// 2.子节点的更新：先是拿新的子节点树和老的子节点树进行比较，此为diff；
// 而后找出差别后再一次性去更新，此称为patch


// 先是处理当前节点属性的变动，后面在去处理子节点的变动
ReactDOMComponent.prototype.receiveComponent = function(nextElement) {
  var lastProps = this._currentElement.props;
  var nextProps = nextElement.props;

  this._currentElement = nextElement;
  // 需要单独的更新属性
  this._updateDOMProperties(lastProps, nextProps)
  // 再更新子节点
  this._updateDOMChildren(nextElement.props.children)
}

// 属性的变更
ReactDOMComponent.prototype._updateDOMProperties = function(lastProps, nextPorps) {
  var propKey;

  // 遍历，当一个老的属性不在新的属性集合里时，需要删除掉
  for (propKey in lastProps) {
    // 新的属性里有，或者propKey是在原型上的直接跳过。这样剩下的都不在新属性集合里的，需要删除
    if(nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnPropperty(propKey)){
      continue;
    }
    // 对于那种特殊的，比如这里的事件监听的属性我们需要去掉监听
    if (/^on[A-Za-z]/.test(propKey)) {
      var eventType = propKey.replace('on', '')
      // 针对当前的节点取消事件代理
      $(document).undelegate('[data-reactid="]' + this._rootNodeID + '"]', eventType, lastProp[propKey]);
      continue;
    }

    // 从dom上删除不需要的属性
    $('[data-reactid="]' + this._rootNodeID + '"]').removeAttr(propKey)
  }

  // 对于新的属性，需要写到dom节点删
  for(propKey in nextProps) {
    // 对于事件监听的属性我们需要特殊处理
    if (/^on[A-Za-z]/.test(propKey)) {
      var eventType = propKey.replace('on','')
      //以前如果已经有，说明有了监听，需要先去掉
      lastProps[propKey] && $(document).undelegate('[data-reactid="]' + this._rootNodeID + '"]', eventType, lastProps[propKey])
      $(document).delegate('[data-reactid="' + this._rootNodeID + '"]', eventType + '.' + this._rootNodeID, nextProps[propKey])
      continue;
    }

    if (propKey === 'children') continue;

    // 添加新的属性，或者是更新老的同名属性
    $('[data-reactid="' + this._rootNodeID + '"]').prop(propKey, nextProps[propKey])
  }
}


// 子节点的变更
// 全局的更新深度标识
var updateDepth = 0;
// 全局的更新队列，所有的差异都存在这里
var diffQueue = [];

ReactDOMComponent.prototype._updateDOMChildren = function(nextChildrenElements) {
  updateDepth++;
  // _diff用来递归找出差别，组装差异对象，添加到更新队列diffQueue
  this._diff(diffQueue, nextChildrenElements);
  updateDepth--
  if(updateDepth == 0){
    // 在需要的时候调用patch, 执行具体的dom操作
    this._patch(diffQueue)
    diffQueue = [];
  }
}

// 差异更新的几种类型
var UPDATE_TYPES = {
  MOVE_EXISTING: 1,
  REMOVE_NODE: 2,
  INSERT_MARKUP: 3
}

// 普通的children是一个数组，此方法把它转换成一个map，key就是element的key，如果text节点或者element创建时并没有传入key，就直接用在数组里的index标识
function flattenChildren(componentChildren) {
  var child;
  var name;
  var childrenMap = {};
  for(var i = 0; i < componentChildren.length; i++) {
    child = componentChildren[i];
    name = child && child._currentElement && child._currentElement.key ? child._currentElement.key : i.toString(36);
    childrenMap[name] = child;
  }
  return childrenMap;
}

// 用来生成子节点elements的component集合
// 有个判断，如果发现是更新，就会继续使用以前的componnetInstance,调用对应的receiveComponent
// 如果是新的节点，就会重新生成一个新的componentInstance
function generateComponentChildren(prevChildren, nextChildrenElements) {
  var nextChildren = {};
  nextChildrenElements = nextChildrenElements || []
  $.each(nextChildrenElements, function(index, element) {
    var name = element.key ? element.key : index;
    var prevChild = prevChildren && prevChildren[name];
    var prevElement = prevChild && prevChild._currentElement;
    var nextElement = element;

    // 调用_shouldUpdateReactComponent判断是否更新
    if(_shouldUpdateReactComponent(prevElement, nextElement)) {
      prevChild.receiveComponent(nextElement);
      nextChildren[name] = prevChild;
    } else {
      var nextChildInstance = instantiateReactComponent(nextElement, null)
      nextChildren[name] = nextChildInstance;
    }
  })

  return nextChildren;
}

// _diff用来递归找出差别，组装差异对象，添加到更新队列diffQueue
ReactDOMComponent.prototype._diff = function(diffQueue, nextChildrenElement) {
  var self = this;
  var prevChildren = flattenChildren(self._renderedChildren)

  var nextChildren = generateComponentChildren(prevChildren, nextChildrenElements)

  self._renderedChildren = []
  $.each(nextChildren, function(key, instance) {
    self._renderedChildren.push(instance)
  })

  var nextIndex = 0;
  for (name in nextChildren) {
    if(!nextChildren.hasOwnProperty(name)) {
      continue;
    }
    var prevChild = prevChildren && prevChildren[name];
    var nextChild = nextChildren[name]
    if (prevChild === nextChild) {
      diffQueue.push({
        parentId: self._rootNodeID,
        parentNode: $('[data-reactid=]' + self._rootNodeID + ']'),
        type: UPDATE_TYPES.MOVE_EXISTING,
        fromIndex: prevChild._mountIndex,
        toIndex: nextIndex
      })
    } else {
      if(prevChild) {
        diffQueue.push({
          parentId: self._rootNodeID,
          parentNode: $('[data-reactid=' + self._rootNodeID + ']'),
          type: UPDATE_TYPES.REMOVE_NODE,
          fromIndex: prevChild._mountIndex,
          toIndex: null
        })

        // 如果以前已经渲染过了，记得先去掉以前所有的事件监听，通过命名空间全部清空
        if (prevChild._rootNodeID) {
          $(document).undelegate('.' + prevChild._rootNodeID)
        }
      }

      diffQueue.push({
        parentId: self._rootNodeID,
        parentNode: $('[data-reactid=' + self._rootNodeID + ']'),
        type: UPDATE_TYPES.INSERT_MARKUP,
        fromIndex: null,
        toIndex: nextIndex,
        markup: nextChild.mountComponent()
      })
    }

    nextChild._mountIndex = nextIndex;
    nextIndex++;
  }

  for(name in prevChildren) {
    if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {

      diffQueue.push({
        parentId: self._rootNodeID,
        parentNode: $('[data-reactid=' + self._rootNodeID + ']'),
        type: UPDATE_TYPES.REMOVE_NODE,
        fromIndex: prevChild._mountIndex,
        toIndex: null
      })

      if(prevChildren[name]._rootNodeID) {
        $(document).undelegate('.' + prevChildren[name]._rootNodeID)
      }
    }
  }

}

// _patch的实现
function insertChildAt(parentNode, childNode, index) {
  var beforeChild = parentNode.children().get(index);
  beforeChild ? childNode.insertBefore(beforeChild) : childNode.appendTo(parentNode)
}

ReactDOMComponent.prototype._patch = function(updates) {
  var update;
  var initialChildren = {};
  var deleteChildern = [];
  for(var i = 0; i < updates.length; i++){
    update = updates[i];
    if (update.type === UPDATE_TYPES.MOVE_EXISTING || update.type === UPDATE_TYPES.REMOVE_NODE) {
      var updatedIndex = update.fromIndex
      var updatedChild = $(update.parentNode.children().get(updatedIndex));
      var parentID = update.parentID;

      // 所以需要更新的节点都保存下来，方便后面使用
      initialChildren[parentID] = initialChildren[parentID] || [];
      // 使用parentID作为简易命名空间
      initialChildren[parentID][updatedIndex] = updatedChild;

      // 所以需要修改的节点先删除，对于move的,后面在重新插入到正确的位置即可
      deleteChildren.push(updatedChild)
    }
  }

  $.each(deleteChildren, function(index, child) {
    $(child).remove();
  })

  //再遍历一次，这次处理新增的节点，还有修改的节点这里也要重新插入
  for (var k = 0; k < updates.length; k++) {
      update = updates[k];
      switch (update.type) {
          case UPATE_TYPES.INSERT_MARKUP:
              insertChildAt(update.parentNode, $(update.markup), update.toIndex);
              break;
          case UPATE_TYPES.MOVE_EXISTING:
              insertChildAt(update.parentNode, initialChildren[update.parentID][update.fromIndex], update.toIndex);
              break;
          case UPATE_TYPES.REMOVE_NODE:
              // 什么都不需要做，因为上面已经帮忙删除掉了
              break;
      }
  }
}


ReactDOMComponent.prototype.mountComponent = function(rootID){

  // 赋值标识
  this._rootNodeID = rootID;
  var props = this._currentElement.props;

  // 在后面会添加'>',因为还有添加额外的属性
  var tagOpen = '<' + this._currentElement.type;
  var tagClose = '</' + this._currentElement.type + '>';

  // 加上reactid标识
  tagOpen += ' data-reactid=' + this._rootNodeID;

  //拼凑出属性
  for (var propKey in props) {

    // 这里要做一下事件的监听，就是从属性props里面解析拿出on开头的事件属性的对应事件监听
    if(/^on[A-Za-z]/.test(propKey)){
      var eventType = propKey.replace('on', '');
      // 针对当前的节点添加事件代理，以_rootNodeID为命名空间
      $(document).delegate('data-reactid="' + this._rootNodeID + '"]', eventType + '.' + this._rootNodeID, props[propKey]);
    }

    // 对于children属性以及事件监听的属性不需要进行字符串拼接
    // 事件会代理到全局。这边不能拼到dom上不然会产生原生的事件监听
    if(props[propKey] && propKey != 'children' && !/^on[A-Za-z]/.test(propKey)){
      tagOpen += ' ' + propKey + '=' + props[propsKey]
    }
  }

  // 获取子节点渲染出的内容
  var content = '';
  var children = props.children || [];

  var childrenInstaces = []; // 用于保存所有的子节点的component实例,以后会用到
  var that = this;
  $.each(children, function(key, child){
    var childComponentInstance = instantiateReactComponent(child);
    // 临时构建的_mountIndex
    childComponentInstance._mountIndex = key;

    childrenInstances.push(childComponentInstance);
    // 子节点的rootId是父节点的rootId加上新的key也就是顺序的值拼成的新值
    var curRootId = that._rootNodeID + '.' + key;
    // 得到子节点的渲染内容
    var childMarkup = childComponentInstance.mountComponent(curRootId);
    // 拼接在一起
    content += ' ' + childMarkup;
  })

  // 留给以后更新时用的这边先不管
  this._renderedChildren = childrenInstances;

  // 拼出整个html内容
  return tagOpen + '>' + content + tagClose;

}

// 定义ReactClass类, 所有自定义的超级父类
var ReactClass = function(){

}

// 留给子类去继承覆盖
ReactClass.prototype.render = function(){}

// setState
ReactClass.prototype.setState = function(newState){
  this._reactInternalInstance.receiveComponent(null, newState)
}

function ReactCompositeComponent(element){
  // 存放元素element对象
  this._currentElement = element;
  // 存放唯一的标识
  this._rootNodeID = null;
  // 存放对应的ReactClass的实例
  this._instance = null;
}

// 更新
ReactCompositeComponent.prototype.receiveComponent = function(nextElement, newState) {

  // 如果接受了新的，就使用最新的element
  this._currentElement = nextElement || this._currentElement

  var inst = this._instance;
  // 合并state
  var nextState = $.extend(inst.state, newState)
  var nextProps = this._currentElement.props

  // 改写state
  inst.state = newState

  // 如果inst有shouldComponentUpdate并且返回false, 说明组件本身判断不要更新，就直接返回
  if (inst.shouldComponentUpdate && (inst.shouldComponentUpdate(nextProps, nextState) === false)) return;

  // 生命周期管理，如果有componentWillUpdate,就调用，表示开始要更新了
  if (inst.componnetWillUpdate) inst.componentWillUpdate(nextProps, nextState);

  var prevComponentInstance = this._renderedComponent;
  var prevRenderedElement = prevComponentInstance._currentElement;
  // 重新执行render拿到对应的新element
  var nextRenderedElement = this._instance.render()

  // 判断是需要更新还是直接重新渲染
  // 注意这里的_shouldUpdateReactComponent跟上面的不同哦，这个是全局的方法
  if (_shouldUpdateReactComponent(prevRenderedElement, nextRenderElement)) {
    // 如果需要更新，就继续调用子节点的receiveComponent的方法，传入新的element更新子节点
    prevComponentInstance.receiveComponent(nextRenderedElement)
    // 调用componentDidUpdate表示更新完成了
    inst.componentDidUpdate && inst.componentDidUpdate()

  } else {
    // 如果发现完全是不用的两种element， 那就干脆重新渲染了
    var thisID = this._rootNodeID
    // 重新new一个对应的componentDidUpdate
    // _instantiateComponent where?
    this._renderedComponent = this._instantiateComponent(nextRenderedElement)
    // 重新生成对应的元素内容
    var nextMarkup = _renderedComponent.mountComponent(thisID)
    // 替换整个节点
    $('[data-reactid="' + this._roorNodeID + '"]').replaceWith(nextMarkup)
  }
}

// 用来判断两个element需不需要更新
// 这里的key是我们createElement的时候可以选择性的传入的。用来标识这个element,当发现key不同时，我们就可以直接重新渲染，不需要去更新了
var _shouldUpdateReactComponent = function(prevElement, nextElement){
  if(prevElement != null && nextElement != null) {
    var prevType = typeof prevElement;
    var nextType = typeof nextElement;
    if(prevType === 'string' || prevType = 'number') {
      return nextType === 'string' || nextType === 'number';
    } else {
      return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
    }
  }
  return false;
}

// 用于返回但其那自定义元素渲染时应该返回的内容
ReactCompositeComponent.prototype.mountComponent = function(rootID){
  this._rootNodeID = rootID;
  // 拿到当前元素对应的属性值
  var publicProps = this._currentElement.props;
  // 拿到对应的ReactClass
  var ReactClass = this._currentElement.type;
  // 初始化这个公共类
  var inst = new ReactClass(publicProps);
  this._instance = inst;
  // 保留对当前的component的引用
  inst._reactInternalInstance = this;

  if(inst.componentWillMount){
    inst.componentWillMount();
  }
  // 调用ReactClass的实例的render方法,返回一个element或者一个文本节点
  var renderedElement = this._instance.render();
  // 得到renderedElement对应的component类实例
  var renderedComponentInstance = instantiateReactComponent(renderedElement);
  this._renderedComponent = renderedComponentInstance;// 存起来留作后用

  // 拿到渲染之后的字符串内容，将当前的_rootNodeID传给render出的节点
  var renderedMarkup = renderedComponentInstance.mountComponent(this._rootNodeID);

  // 之前我们在React.render方法最后触发了mountReady事件，所以这里可以监听，在渲染完成后会触发
  $(document).on('mountReady', function(){
    // 调用inst.componentDidMount
    inst.componentDidMount && inst.componentDidMount();
  });

  return renderedMarkup;
}

// componentDOMText工厂 用来返回一个component实例
function instantiateReactComponent(node){
  // 构建真实的文本节点
  if(typeof node === 'string' || typeof node === 'number'){
    return new ReactDOMTextComponent(node);
  }
  // 构建真实的浏览器默认节点
  if(typeof node === 'object' && typeof node.type === 'string'){
    return new ReactDOMComponent(node);
  }
  // 自定义的元素节点
  if(typeof node === 'object' && typeof node.type === 'function'){
    return ReactCompositeComponent(node);
  }
}

// ReactElement就是虚拟DOM的概念，具有一个type属性代表当前的节点类型，还有节点的属性props
// 比如对于div这样的节点type就是div，props就是那些attributes
// 另外这里的key,可以用来标识这个element，用来优化以后的更新
// 同时，createElement只是做了简单的参数修正，最终返回一个虚拟元素的实例
function ReactElement(type, key, props){
  this.type = type; // 标签的类型
  this.key = key; // ？
  this.props = props; // attributes
}

React = {
  nextReactRootIndex: 0,
  createClass: function(spec){
    // 生成一个子类
    var Constructor = function(props){
      this.props = props;
      this.state = this.getInitialState ? this.getInitialState() : null;
    }
    // 原型继承，继承超级父类
    Constructor.prototype = new ReactClass();
    Constructor.prototype.constructor = Constructor;
    // 混入spec到原型
    $.extend(Constructor.prototype, spec);
    return Constructor;

  },
  createElement: function(type, config, children){
    var props = {},
        propName,
        config = config || {};

    // 有没有key，用来标识element的类型, 方便以后高效的更新，这里可以先不管
    var key = config.key || null;

    // 赋值config里的内容到props
    for( propName in config ){
      if(config.hasOwnProperty(propName) && propName !== 'key'){
        props[propName] = config[propName];
      }
    }

    // 处理children, 全部挂载到props的children属性上
    // children这个参数的个数可以为一个或者多个
    var childrenLength = arguments.length - 2;
    if(childrenLength === 1){
      props.children = $.isArray(children) ? children : [children];
    }else if (childrenLength > 1){
      var childArray = Array(childrenLength);
      for(var i = 0; i < childrenLength; i++){
        childArray[i] = argument[i + 2];
      }
      props.children = childArray;
    }

    return new ReactElement(type, key, props);
  },
  render: function(element, container){
    var componentInstance = instantiateReactComponent(element);
    var markup = componentInstance.mountComponent(React.nextReactRootIndex++)

    $(document).html(markup);
    // 完成mount事件时触发
    $(document).trigger('mountReady');

  }
};
