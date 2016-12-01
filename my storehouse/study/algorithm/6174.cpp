#include <stdio.h>
#include <string.h>
int get_next(int x)
{
	int s_num,b_num,len;
	char str_num[10];
	
	sprintf(str_num,"%d",x);
	len = strlen(str_num);
	
	for(int i=0; i < len;i++)
		for(int j=i+1; j < len;j++)
			if(str_num[i] > str_num[j])
			{
				char t = str_num[i];
				str_num[i] = str_num[j];
				str_num[j] = t;
			}
	sscanf(str_num,"%d",&s_num);
	
	//×Ö·û´®·´×ª
	for(int i=0; i < len/2;i++)
	{
		char t = str_num[i];
		str_num[i] = str_num[len - 1 - i];
		str_num[len - 1 - i] = t;	
	}
	sscanf(str_num,"%d",&b_num);
	return b_num - s_num;
}

int num[2000], count;
int main()
{
	scanf("%d", &num[0]);
	printf("%d",num[0]);
	count = 1;
	for(;;)
	{
		num[count] = get_next(num[count-1]);
		printf(" -> %d",num[count]);
		
		int found = 0;
		for(int i = 0; i < count; i++)
			if(num[i] == num[count]){
				found = 1;
				break;
			}
		if(found)	break;
		count++;
	}
	printf("\n");
	return 0;
 } 
