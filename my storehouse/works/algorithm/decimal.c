#include <stdio.h>

int main()
{
	int a, b, c;  
    double x;  
    scanf("%d%d%d", &a, &b, &c);  
    x = 1.0*a/b;  
    printf("%.*lf\n", c, x);    //printf("%*.*lf", x, y, z) 第一个*对应x，第二个*对应y，lf对应z 
	return 0;
}
