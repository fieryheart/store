#include <stdio.h>
#include <string.h>
#include <math.h>
#include <ctype.h>
#define MAXN 5000+10
char buf[MAXN];
char str_num[MAXN][MAXN];
int num[MAXN] = {0};
int main()
{
	int length, product = 1, n = 0, m = 0;
	int i, j, k;
	fgets(buf, sizeof(buf), stdin);
	length = strlen(buf);
	for(i = 0;i < length;i++)
	{
		if(isdigit(buf[i]))
			str_num[n][m++] = buf[i];
		if(buf[i+1] == ' ')
		{
			m = 0;
			n++;
		}
			
	}
	for(i = 0;i <= n; i++)
		for(j = 0;j < m;j++)
			num[i] += (str_num[i][j] - '0') * pow(10,m-j-1);
			
	for(i = 0;i <= n;i++)
		product *= num[i];

	k = product % 1000;
	if( k >= 0 && k < 10)
		printf("00%d",k);
	else if(k >= 10 && k < 100)
		printf("0%d",k);
	else
		printf("%d",k);
	return 0;
}
