#include <stdio.h>

int main()
{
	int num;
	while(scanf("%d",&num) == 1)
	{
		int col = 1;
		int sum = 0;
		
		for(;;)
		{
			sum += col;
			if(num <= sum && num > sum - col)
				break;
			col++;
		}
	
		if(col % 2 == 1)
			printf("%d/%d\n",1+col-num+col*(col-1)/2,num-col*(col-1)/2);
		else
			printf("%d/%d\n",num-col*(col-1)/2,1+col-num+col*(col-1)/2);
		getchar();
	}
	

	
	return 0;
}
