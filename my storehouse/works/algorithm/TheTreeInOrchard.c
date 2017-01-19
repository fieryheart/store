#include <stdio.h>
#include <math.h>

double area(double x0, double y0, double x1, double y1, double x2, double y2)
{
	return x0*y1 + x2*y0 + x1*y2 - x2*y1 - x0*y2 - x1*y0;
}


int main()
{
	double x0,y0,x1,y1,x2,y2;
	int i,j,count=0;
	double area0;
	double area1,area2,area3;
	scanf("%lf%lf%lf%lf%lf%lf",&x0,&y0,&x1,&y1,&x2,&y2);
	area0 = area(x0,y0,x1,y1,x2,y2);
	
	for(i = 1 ; i <= 99 ; i++)
		for(j = 1;j <= 99; j++)
		{
			area1 = area(i,j,x1,y1,x2,y2);
			area2 = area(x0,y0,i,j,x2,y2);
			area3 = area(x0,y0,x1,y1,i,j);
			if(fabs(area1+area2+area3-area0) <= 1e-9)
				count++;
		}
	printf("%d\n",count);
	return 0;
}


