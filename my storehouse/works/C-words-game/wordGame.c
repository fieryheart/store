#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>

//定义单词的结构体
typedef struct Word{
	
	char str[10];
	int x;
	int y;
	int length;
	
}Word;

//定义game的结构体 
typedef struct wordGame{

	
	Word str1;
	Word str2;
	Word str3;
	Word str4;
	
	int str12_x;
	int str12_y;
	
	
	int str34_x;
	int str34_y;
	
	
	int D_value;
	
	int width;
	int height; 
	
	
	
	int Bool;
	
	struct wordGame *next;
	
}wordGame;

//用链表存储单词
wordGame* wordSourceArea();

//确定单词的长度，相同单词的相对坐标以及每个单词头部字母的坐标
int wordFactory(wordGame *game);

//将单词赋值给动态二维数组，并打印
void wordTransport(wordGame *game);

//用链表实现单词组的遍历
void wordHitShelves(wordGame *game);

//销毁链表，释放内存
void wordClearance(wordGame *game);

void init();

void gameStart();
//主函数
int main()
{

	gameStart();
	
	return 0;	 
}



int wordFactory(wordGame *game)
{
	
	int i,j;
	int Bool[2];
	
	//分别获取str1、str2、str3、str4的长度
	game->str1.length = strlen(game->str1.str);
	game->str2.length = strlen(game->str2.str);
	game->str3.length = strlen(game->str3.str);
	game->str4.length = strlen(game->str4.str);
	
	//通过两个for循环来确定str1和str2相同单词的相对位置
	for ( i = 0; i < game->str2.length; i++)
	{
		for ( j = 0; j < game->str1.length; j++)
		 {
		 	if ( game->str2.str[i] == game->str1.str[j] )
			{
				//Bool数组用来确定这两个单词中是否有相同的字母
		 		Bool[0] = 1;
		 		//相同字母赋值坐标
		 		game->str12_x = j;
		 		game->str12_y = i;
		 		break;
			}
		}
		if ( game->str2.str[i] == game->str1.str[j] )break;
	}
 
	//同上确定str3和str4
	for ( i = 0; i < game->str4.length; i++)
	{
		for ( j = 0; j < game->str3.length; j++)
		{
		 	if ( game->str4.str[i] == game->str3.str[j] )
		 	{
		 		Bool[1] = 1;
		 		game->str34_x = j;
		 		game->str34_y = i;
		 		break;
			}
		}
		if ( game->str4.str[i] == game->str3.str[j] )break;
	}
	
	//确定两个水平单词的高度差
	game->D_value = fabs( game->str12_y - game->str34_y);

	if ( game->str12_y >= game->str34_y )
	{

		/* 对str12_y >= str34_y的情况进行四个初始点的坐标赋值 */
		game->str2.y = 0;
		game->str4.y = game->D_value;
		game->str1.y = game->str3.y = game->str12_y;

		game->str2.x = game->str12_x;
		game->str1.x = 0;
		game->str3.x = game->str1.length + 3;
		game->str4.x = game->str3.x + game->str34_x;
		
		//确定动态二维数组的长度	
		game->width  = game->str1.length + game->str3.length + 3;
		//确定动态二维数组的高度
		game->height = (game->str2.length > (game->str4.length + game->D_value))? game->str2.length : (game->str4.length + game->D_value);

	}//同上
	else if ( game->str12_y < game->str34_y )
	{

		game->str4.y = 0;
		game->str2.y = game->D_value;
		game->str1.y = game->str3.y = game->str34_y;

		game->str2.x = game->str12_x;
		game->str1.x = 0;
		game->str3.x = game->str1.length + 3;
		game->str4.x = game->str3.x + game->str34_x;
		/* 对str12_y < str34_y的情况进行四个初始点的坐标赋值 */
		
		game->width  = game->str1.length + game->str3.length + 3;
		
		game->height = (game->str2.length + game->D_value > game->str4.length)? (game->str2.length + game->D_value) : game->str4.length;

	}
	
	//如果str1、str2和str3、str4都有相同的字母，则返回1；否则返回0
	if(Bool[0] == 1 && Bool[1] == 1)
		return 1;
	else
		return 0;

}

void wordTransport(wordGame *game)
{
	char **container;
	int i,j;
	//定义一个动态的二维数组
	//向计算机申请动态二维数组的行指针的内存
	container = (char **)malloc(sizeof(char*) * game->height);
	//向计算机申请动态二维数组每一行的内存，并赋值为空
	for(i = 0;i < game->height;i++){
		container[i] = (char *)malloc(sizeof(char) * game->width);
		for(j = 0;j < game->width;j++)
			container[i][j] = 0;
	}
	
	//用4个for循环将str1、str2、str3、str4赋值给二维数组
	for(i = 0;i < game->str2.length;i++)
		container[game->str2.y++][game->str2.x] = game->str2.str[i];		
	for(i = 0;i < game->str4.length;i++)
		container[game->str4.y++][game->str4.x] = game->str4.str[i];
	for(i = 0;i < game->str1.length;i++)
		container[game->str1.y][game->str1.x++] = game->str1.str[i];		
	for(i = 0;i < game->str3.length;i++)
		container[game->str3.y][game->str3.x++] = game->str3.str[i];
		
	//打印这个二维数组
	for(i = 0;i < game->height;i++)
	{
		for(j = 0;j < game->width;j++)
		{
			printf("%c",container[i][j]);
		}
		printf("\n");
	}
	printf("\n");
	
	free(*container);
	free(container);
	
}

wordGame* wordSourceArea()
{
	//定义链表 
	wordGame *box;
	//定义链表头部 
	wordGame *game;
	//向计算机申请内存 
	box 	= (wordGame *)malloc(sizeof(wordGame)); 
	game 	= (wordGame *)malloc(sizeof(wordGame));
	//输入链表头部的str数据 
	scanf("%s %s %s %s",game->str1.str,game->str2.str,game->str3.str,game->str4.str);
	box = game;
	getchar();
	
	//构建链表 
	while(getchar() != '#')
	{
		
		wordGame *list;
		list = (wordGame *)malloc(sizeof(wordGame));
		scanf("%s %s %s %s",list->str1.str,list->str2.str,list->str3.str,list->str4.str);
		
		box->next = list;
		box = list;
		getchar();
				
	}
	
	box->next = NULL;

	return game;
}

void wordHitShelves(wordGame *game)
{ 
		//链表的遍历
		do{
			
			game->Bool = wordFactory(game);
		
			printf("",game->Bool);

			if(game->Bool)
				wordTransport(game);
			else
				printf("Unable to make two crosses.\n");


			if(game->next != NULL)
				game = game->next;
			else if(game->next == NULL)
				break;
		
	}while(1);
	

 }

void wordClearance(wordGame *game)
{
	wordGame *tmp;
	//销毁链表 
	do{
		
		tmp = game;
		game = game->next;
		free(tmp);
		
	}while(NULL != game);
	
} 
 
 
void init()
{
	
	wordGame *game;
	printf("游戏开始，请输入你的单词组：\n");
	//传出链表头的坐标
	game = wordSourceArea();
	
	wordHitShelves(game);

	wordClearance(game);
	
} 
 
void gameStart(){
	
	
	do
	{
		
		system("cls");
		init();
		printf("你想再玩一遍吗？请输入Y或N\n");
		getchar();
		
	}while(getchar() == 'Y');
		
} 
