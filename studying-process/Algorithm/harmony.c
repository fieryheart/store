#include <stdio.h>

int main(){
	int i,n;
	double harmony = 0.0;
	scanf("%d",&n);
	for(i = 1;i <= n;i++){
		harmony += 1.0 / i;
	}
	printf("%.3lf",harmony);
	return 0;
}
