# 基于React+Redux的前端开发实例---“苹果篮子”

###静态布局：
    1、苹果篮子容器：AppleBasket.jsx + appleBasket.scss
    2、苹果组件：AppleItem.jsx + appleItem.scss

###动态布局
1、给容器和组件制定state
2、“苹果篮子”容器
```
        {
               isPicking : false,
               newAppleId : 1,
               apples: [
                   {
                       id: 0,
                       weight: 235,
                       isEaten: false
                   }
               ]
        }
```

而后在AppleBasket.jsx中将取到的容器state进行数据处理，得到需要的stats，即剩余多少苹果和已吃多少苹果
3、单个苹果组件
```
{
    id: 1,
    weight: 256,
    isEaten: false
}
```

###action
1、编写需要的action类型，如摘苹果、吃苹果、成功的情况、失败的情况等动作
```
let action = (dispatch, getState) => { 
    ajax({
        url: '/pickApple',
        method: 'GET',
    })
    .done(data => {
        //发射普通 action
        dispatch({
            type: 'DONE_PICK_APPLE',
            payload: data.weight // 或者 payload: {weight: data.weight}
        }); 
    })
    .fail(xhr => {
        //发射普通 action, 其负载是一个error
        dispatch({
            type: 'FAIL_PICK_APPLE',
            payload: new Error(xhr.responseText) ,
            error: true
        }); 
    })
}
```
2、使用dispatch(action)，//dispatch: 派遣
3、将各个整合action为一个actionCreator