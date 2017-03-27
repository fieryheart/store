# flex布局学习笔记

## 容器的属性
+ flex-direction: 决定主轴的方向
 + row
 + row-reverse
 + column
 + column-reverse
+ flex-wrap: 项目如何换行
 + nowrap
 + wrap
 + wrap-reverse
+ flex-flow: flex-direction和flex-wrap的简写
+ justify-content: 项目在主轴上的对齐方向
 + flex-start
 + flex-end
 + center
 + space-between
 + space-around
+ align-items: 项目在交叉轴上的对齐方向
 + flex-start
 + flex-end
 + center
 + stretch
 + baseline
+ align-content: 定义多根轴的对齐方向
 + flex-start
 + flex-end
 + center
 + stretch
 + space-between
 + space-around

## 项目的属性
+ order: 项目的排列顺序
+ flex-grow: 项目的放大比例
+ flex-shrink: 项目的缩小比例
+ flex-basis: 项目占据固定空间
+ flex: flex-grow + flex-shrink + flex-basis
+ align-self: 允许单个项目与其他项目不一样的对齐方式
 + flex-start
 + flex-end
 + center
 + stretch
 + baseline
