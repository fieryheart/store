#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <math.h>
#define MAXN 100+10
char buf[MAXN];
char num[2][MAXN];
int main()
{
	int i,length,j = 0,k = 0,list = 0;
	double data[2],result;
	char symbol;
	fgets(buf, sizeof(buf), stdin);
	length = strlen(buf);
	
	for(i = 0;i < length;i++)
	{
		if(isdigit(buf[i]))
		{
			num[list][j++] = buf[i];			
		}
		else if(!isdigit(buf[i]) && buf[i] != '\n')
		{
			if(isdigit(buf[i+1]))
			{
				j = 0;
				list++;
			}				
			if(buf[i] != ' ')
				symbol = buf[i];
			else if(buf[i] == ' ')
				continue;
			else
				return 0;
		}
	}
	for(i = 0;i <= list;i++)
	{
		length = strlen(num[i]);
		for(j = 0;j < length;j++)			
			data[i] += (num[i][j] - '0') * pow(10,length-j-1);			
	}
	switch(symbol){
		case '+':
			result = data[0] + data[1];
			break;
		case '-':
			result = data[0] - data[1];
			break;
		case '*':
			result = data[0] * data[1];
			break;
	}

	printf("%d",(int)result);
	return 0;
} 
