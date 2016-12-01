#include <stdio.h>
#include <string.h>
#include <ctype.h>
#define MAXN 5000 + 10
char buf[MAXN], s[MAXN];
int main()
{
	int n, m = 0, l = 0;
	int i, j, k;
	fgets(buf, sizeof(s), stdin);
	n = strlen(buf);
	for(i = 0;i < n; i++)
	{
		if(isalpha(buf[i]))
		{
			s[m++] = buf[i];			
		}
		if(isalpha(buf[i]) && buf[i+1] == ' ')
		{
			l++;	
		}
	}
	printf("%.2lf\n",1.0 * m/ (l+1));
	return 0;
}
