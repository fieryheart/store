#include <stdio.h>

int main()
{
	int n,m,i;
	double sum;
	scanf("%d%d",&n,&m);
	for(i = n;i <= m;i++)
	{
		sum += 1.0 / i / i;
	}		
	printf("%.5lf",sum );
	return 0;
 } 
