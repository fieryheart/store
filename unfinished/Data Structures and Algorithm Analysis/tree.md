# 数据结构-树
1. 树的搜索效率与树的深度有关

## 二叉搜索树
+ 二叉搜索树所需要进行的操作最多与树的深度相等。n格节点的二叉搜树的深度最多为n，最少为log(n),即一个有n个节点的二叉树，它的最小深度时log(n)，最大深度是n

## AVL树
+ 任一个节点的左子树深度和右子树深度相差不超过1
+ 单旋转就是将 2<-3<-5 变为 2<-3->5
+ 双旋转就是将 4<-3<-5 变为 3<-4->5

## 伸展树(splay tree)
+ 为什么伸展树的m次连续搜索操作的复杂度为mlog(n)的量级，而不是mn量级
> 因为伸展树会在一次搜索后，对树进行旋转操作，将第一次搜索的目标转移到根节点上，树的深度减小，方便之后的搜索
+ zig, zig-zag, zig-zig是什么结构
> zig: 目标节点 是 根节点的左子节点或右子节点  
> zig-zag: 目标节点 是 父节点的右子节点, 父节点 是 祖父节点的左子节点  
> zig-zig: 目标节点 是 父节点的左子节点, 父节点 是 祖父节点的左子节点
+ zig, zig-zag, zig-zig构型分别怎么旋转操作
> zig: 进行单旋转  
> zig-zag: 进行双旋转  
> zig-zig: 进行zig-zig旋转  
> 反正最终目的是将目标节点变为根节点，其他节点按照二叉树规则依次排布
+ 伸展树的应用
> 在网络应用中，某些固定内容被大量重复访问（比如“我们走，皮皮虾”）。伸展树可以让这种重复操作以很高的效率完成
