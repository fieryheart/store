#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>

//���嵥�ʵĽṹ��
typedef struct Word{
	
	char str[10];
	int x;
	int y;
	int length;
	
}Word;

//����game�Ľṹ�� 
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

//������洢����
wordGame* wordSourceArea();

//ȷ�����ʵĳ��ȣ���ͬ���ʵ���������Լ�ÿ������ͷ����ĸ������
int wordFactory(wordGame *game);

//�����ʸ�ֵ����̬��ά���飬����ӡ
void wordTransport(wordGame *game);

//������ʵ�ֵ�����ı���
void wordHitShelves(wordGame *game);

//���������ͷ��ڴ�
void wordClearance(wordGame *game);

void init();

void gameStart();
//������
int main()
{

	gameStart();
	
	return 0;	 
}



int wordFactory(wordGame *game)
{
	
	int i,j;
	int Bool[2];
	
	//�ֱ��ȡstr1��str2��str3��str4�ĳ���
	game->str1.length = strlen(game->str1.str);
	game->str2.length = strlen(game->str2.str);
	game->str3.length = strlen(game->str3.str);
	game->str4.length = strlen(game->str4.str);
	
	//ͨ������forѭ����ȷ��str1��str2��ͬ���ʵ����λ��
	for ( i = 0; i < game->str2.length; i++)
	{
		for ( j = 0; j < game->str1.length; j++)
		 {
		 	if ( game->str2.str[i] == game->str1.str[j] )
			{
				//Bool��������ȷ���������������Ƿ�����ͬ����ĸ
		 		Bool[0] = 1;
		 		//��ͬ��ĸ��ֵ����
		 		game->str12_x = j;
		 		game->str12_y = i;
		 		break;
			}
		}
		if ( game->str2.str[i] == game->str1.str[j] )break;
	}
 
	//ͬ��ȷ��str3��str4
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
	
	//ȷ������ˮƽ���ʵĸ߶Ȳ�
	game->D_value = fabs( game->str12_y - game->str34_y);

	if ( game->str12_y >= game->str34_y )
	{

		/* ��str12_y >= str34_y����������ĸ���ʼ������긳ֵ */
		game->str2.y = 0;
		game->str4.y = game->D_value;
		game->str1.y = game->str3.y = game->str12_y;

		game->str2.x = game->str12_x;
		game->str1.x = 0;
		game->str3.x = game->str1.length + 3;
		game->str4.x = game->str3.x + game->str34_x;
		
		//ȷ����̬��ά����ĳ���	
		game->width  = game->str1.length + game->str3.length + 3;
		//ȷ����̬��ά����ĸ߶�
		game->height = (game->str2.length > (game->str4.length + game->D_value))? game->str2.length : (game->str4.length + game->D_value);

	}//ͬ��
	else if ( game->str12_y < game->str34_y )
	{

		game->str4.y = 0;
		game->str2.y = game->D_value;
		game->str1.y = game->str3.y = game->str34_y;

		game->str2.x = game->str12_x;
		game->str1.x = 0;
		game->str3.x = game->str1.length + 3;
		game->str4.x = game->str3.x + game->str34_x;
		/* ��str12_y < str34_y����������ĸ���ʼ������긳ֵ */
		
		game->width  = game->str1.length + game->str3.length + 3;
		
		game->height = (game->str2.length + game->D_value > game->str4.length)? (game->str2.length + game->D_value) : game->str4.length;

	}
	
	//���str1��str2��str3��str4������ͬ����ĸ���򷵻�1�����򷵻�0
	if(Bool[0] == 1 && Bool[1] == 1)
		return 1;
	else
		return 0;

}

void wordTransport(wordGame *game)
{
	char **container;
	int i,j;
	//����һ����̬�Ķ�ά����
	//���������붯̬��ά�������ָ����ڴ�
	container = (char **)malloc(sizeof(char*) * game->height);
	//���������붯̬��ά����ÿһ�е��ڴ棬����ֵΪ��
	for(i = 0;i < game->height;i++){
		container[i] = (char *)malloc(sizeof(char) * game->width);
		for(j = 0;j < game->width;j++)
			container[i][j] = 0;
	}
	
	//��4��forѭ����str1��str2��str3��str4��ֵ����ά����
	for(i = 0;i < game->str2.length;i++)
		container[game->str2.y++][game->str2.x] = game->str2.str[i];		
	for(i = 0;i < game->str4.length;i++)
		container[game->str4.y++][game->str4.x] = game->str4.str[i];
	for(i = 0;i < game->str1.length;i++)
		container[game->str1.y][game->str1.x++] = game->str1.str[i];		
	for(i = 0;i < game->str3.length;i++)
		container[game->str3.y][game->str3.x++] = game->str3.str[i];
		
	//��ӡ�����ά����
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
	//�������� 
	wordGame *box;
	//��������ͷ�� 
	wordGame *game;
	//�����������ڴ� 
	box 	= (wordGame *)malloc(sizeof(wordGame)); 
	game 	= (wordGame *)malloc(sizeof(wordGame));
	//��������ͷ����str���� 
	scanf("%s %s %s %s",game->str1.str,game->str2.str,game->str3.str,game->str4.str);
	box = game;
	getchar();
	
	//�������� 
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
		//����ı���
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
	//�������� 
	do{
		
		tmp = game;
		game = game->next;
		free(tmp);
		
	}while(NULL != game);
	
} 
 
 
void init()
{
	
	wordGame *game;
	printf("��Ϸ��ʼ����������ĵ����飺\n");
	//��������ͷ������
	game = wordSourceArea();
	
	wordHitShelves(game);

	wordClearance(game);
	
} 
 
void gameStart(){
	
	
	do
	{
		
		system("cls");
		init();
		printf("��������һ����������Y��N\n");
		getchar();
		
	}while(getchar() == 'Y');
		
} 
