#include <stdio.h>
#include <assert.h>
void solve(double a, double b, double c, double d, double e,double f,double *x,double *y)
{

	*x = (c*e - b*f) / (a*e - b*d);
	*y = (c*d - a*f) / (b*d - a*e);
	printf("true");
}


int main()
{
	double a,b,c,d,e,f;
	double *x,*y;
	int t;
	scanf("%lf%lf%lf%lf%lf%lf",&a,&b,&c,&d,&e,&f);
	t = (a*e - b*d) > 0.00001 || (a*e - b*d) < -0.00001;

	assert(t == 1);
	solve(a,b,c,d,e,f,x,y);
	
	printf("x = %lf\ny = %lf",*x,*y);
	return 0;
}
