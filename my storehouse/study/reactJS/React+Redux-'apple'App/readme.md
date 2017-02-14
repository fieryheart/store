# 基于React+Redux的前端开发实例---“苹果篮子”

静态布局：
    1、苹果篮子容器：AppleBasket.jsx + appleBasket.scss
    2、苹果组件：AppleItem.jsx + appleItem.scss

动态布局
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