#include<stdio.h>

//��һ����ⷽ����O(n)
void First(){
	int n,x1,x2,x3,x4;
	for(n = 100;n < 1000; n++){
		x1 = n %10;
		x2 = n /10 %10;
		x3 = n /100 %10;
		if(n == x1*x1*x1 + x2*x2*x2 + x3*x3*x3)
			printf("%d\n",n);
	}
}

//�ڶ�����ⷽ����O(n^3)
void Second(){
	int i,j,k,sum;
	for(i = 1;i < 10;i++){
		for(j = 0;j < 10;j++){
			for(k = 0;k < 10;k++){
				sum = 100*i+10*j+k;
				if(sum == i*i*i+j*j*j+k*k*k)
					printf("%d\n",sum);
			}
		}
	}
}


int main(){
	 
	First();
	Second();

	
	return 0;
} 
