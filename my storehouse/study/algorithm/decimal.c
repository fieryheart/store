#include <stdio.h>

int main()
{
	int a, b, c;  
    double x;  
    scanf("%d%d%d", &a, &b, &c);  
    x = 1.0*a/b;  
    printf("%.*lf\n", c, x);    //printf("%*.*lf", x, y, z) ��һ��*��Ӧx���ڶ���*��Ӧy��lf��Ӧz 
	return 0;
}
