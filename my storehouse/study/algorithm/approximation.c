#include <stdio.h>
#include <math.h>

int main(){
	int i = 0;
	double pi = 0.0;
	do{
		pi += pow(-1,i) / (2*i + 1);
		i++;
	}while(1.0/(2*i + 1) > 1e-6);
	printf("%lf",pi*4);
	return 0;
}
