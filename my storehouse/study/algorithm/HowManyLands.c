#include <stdio.h>


int main()
{
	int n,i;
	int V=0,E=0,F=0;
	
	scanf("%d",&n);
	
	for(i = 0; i <= n-2; i++)
		V += i*(n-2-i);
	for(i = 0; i <= n-2; i++)
		E += i*(n-2-i)+1;
	
	V = n + V * n/4;
	E = n + E * n/2;
	
	F = E - V + 1;
	printf("F = %d\n",F);
	return 0;
} 
