#include <stdio.h>
#define MAXN 100+10
int num[MAXN] = {0};
int score[MAXN][2] = {0};
int SameScore[MAXN] = {0}; 
int main()
{
	int i = 0;
	int j = 0;
	int k = 0;
	int length;
	int max[MAXN][2] = {0};
	do
	{
		scanf("%d",(num+i));
		i++;
	}while(getchar() != '\n');
	
	length = i;
	for(i = 0;i <= 100;i++)
	{
		score[i][0] = i;
		for(j = 0;j < length;j++)
		{
			if(num[j] == i)
			{
				score[i][1]++;
			
			}
		}
	}
	j = 0;

	for(i = 0;i < 100;i++)
	{
		
		if(score[i][1] > max[0][1])
		{

			for(k = 0;k < j;k++)
			{
				max[j][0] = 0;	
				j = 0;
			}
			max[0][0] = score[i][0];
			max[0][1] = score[i][1];
		}		
		else if(score[i][1] == max[0][1])
		{
			
			max[++j][0] = score[i][0];
			
		}
	}
	for(i = 0;i <= j;i++)
		printf("%d ",max[i][0]);
	return 0;
}
