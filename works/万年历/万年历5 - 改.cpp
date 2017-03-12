#include<stdio.h>
#include<stdlib.h>
#include<time.h>
#include<conio.h>
#include<string.h>
#include<windows.h>
const char *week[]={"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
const char *month_sel[]={"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"};
int year,month,day,hour,minutes,second,weekday;
int x=2; //ÿ����ʾ����

const int isLeap(int year);  //�ж��Ƿ�Ϊ����
const int getMonthDays(int year,int month);  //����ĳ��ĳ�µ�����
const int yearDays(int year);  //����ĳ�������
void printCalendar(int year,int month);  //��ӡĳ��ĳ�µ�����
void printCalendar(int year); //��ӡĳ�������
void printCalendara(int year);  //��ʾ�����ɱ�����
void sleep(); //��ʱ����
void getLocalTime(time_t timep,struct tm *p); //��ȡ����ʱ��
void showLastMonth();  //��ʾ�ϴβ鿴������
void showLastYear();  //��ʾ�ϴβ鿴������
void digitToImage(int year);  //������ת��Ϊ�ַ����
void checkHolidayPrintMonth(int year, int month, int day,char *saveMon); // ���һ���������ղ���� 
void checkHolidayPrintYear(int year, int month, int day, char *saveMon); // ���һ���������ղ���� 
void checkHoliday(int year, int month, int day); // ��������ղ����

int main()
{
    printf("********************************************\n");
	printf("*                                          *\n");
	printf("*                ��������ѯ                *\n");
	printf("*                                          *\n");
	printf("********************************************\n");

    int func;
    int action=0;
    int year1;

    time_t timep;
    struct tm *p;
    while(1)
    {
   	printf("\n");
    printf("=======               �˵�           =======\n");
    printf("=======1����ʾ��ǰʱ��͵�������          ==\n");
    printf("=======2��������ݲ�ѯ�������ļ�          ==\n");
    printf("=======3��������ݲ�ѯ������ÿ����ʾ����  ==\n");
    printf("=======4����ʾ�ϴβ鿴������              ==\n");
    printf("=======5����ʾ�ϴβ鿴������              ==\n");
    scanf("%d",&func);
	getchar();

        switch(func)
        {
        //��������
        case 1:
            getLocalTime(timep,p);
            break;
        case 2:
            do{ 
            printf("���������");
            scanf("%d",&year);
            getchar();
            }while(year<=1900||year>=3000); 
            printCalendar(year);
            break;
        //������ݲ�ѯ
        case 3:
        do{
            printf("��������ݺ�ÿ����ʾ���·���(<=4)");
            scanf("%d %d",&year,&x);
            getchar();
            }while(year<=1900||year>=3000); 
            printCalendara(year);
            x=2;
            break;
        case 4:
            showLastMonth();
            break;
        case 5:
            showLastYear();
            break;
        default:
            break;
        }
        
        getchar();
		system("cls"); 
    }
    return 0;
}

//�ж�?year?�Ƿ�������??����?1?Ϊ����
const int isLeap(int year)
{
    if(year%4==0 && year%100!=0 || year%400==0)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

//����?year?���?month?���Ƕ�����?*����ֵ�����ͣ�����
const int getMonthDays(int year,int month)
{
    switch(month)
    {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
            break;
        case 2:
            if(isLeap(year))
            {
                return 29;
            }
            else
            {
                return 28;
            }
            break;
            default:
                return 0;
                break;
    }
}

//����?year?�������
const int yearDays(int year)
{
    if(isLeap(year))
    {
        return 366;
    }
    else
    {
        return 365;
    }
}

//�ж�?year?��?month?��?day?��ʱ���ڼ�,����ֵ:0,1,2,3,4,5,6
const int isWeek(int year,int month,int day)
{
    int days=0;
    int i;
    //����ǰ?year?���ж�����
    for(i=1;i<year;i++)
    {
        days=days+yearDays(i);
    }
    //����?year?���ǰ?month?�����ж�����
    for(i=1;i<month;i++)
    {
        days=days+getMonthDays(year,i);
    }
    //�ӹ�Ԫ?1?��
    days=days+day;
    return days%7;
}

//�������ĸ�ʽ��ӡ?year?��?month?�µ�����
void printCalendar(int year,int month)
{
	digitToImage(year);
    FILE *fp;
    char saveMon[1024],temp[100];
    fp=fopen("month1.txt","w+");
    if(fp==NULL)
    {
        printf("�ļ�����ʧ��\n");
        return;
    }

    int i,j;
    int row=0,row1=0;
	// �õ�һ���µ�����
	int days = getMonthDays(year, month);
	// �ж�ÿһ�еĿ�ͷday 
	int headDay = 1; 
    //������תΪ�ַ����
    digitToImage(year);

    printf("                       %s\n",month_sel[month]);
    printf("---------------------------------------------------\n");
    fprintf(fp,"                       %s\n",month_sel[month]);
    fprintf(fp,"---------------------------------------------------\n");

    //��ӡ����
    for(i=0;i<7;i++)
    {
        printf("%s\t",week[i]);
        strcat(saveMon,week[i]);
        strcat(saveMon,"\t");
    }
    fprintf(fp,"%s\n",saveMon);
    memset(saveMon,0,sizeof(saveMon));

    printf("\n");

    //�ж�?year?��?month?��?1?��ʱ���ڼ�
    for(i=0;i<isWeek(year,month,1);i++)
    {
        printf("\t");
        strcat(saveMon,"\t");
    }

    for(i=0;i<days;i++)
    {
        printf("%d\t",i+1);

        itoa(i+1, temp, 10);
        strcat(saveMon,temp);
        memset(temp,0,sizeof(temp));
        strcat(saveMon,"\t");

        //������������ͻ��д�ӡ����
        if(isWeek(year,month,i+1)==6)
        {
            row ++;
            printf("\n");
            fprintf(fp,"%s\n",saveMon);
            memset(saveMon,0,sizeof(saveMon));
            
            // ������� 
            for(j = headDay; j <= i+1; j++)
			{
				checkHolidayPrintMonth(year,month, j, saveMon);
			}
            
            printf("\n");
            fprintf(fp, "%s\n", saveMon);
            memset(saveMon, 0, sizeof(saveMon));
            headDay = i + 2;
            
        }
        
    }

    fclose(fp);


    fp=fopen("month.txt","w+");
    if(fp==NULL)
    {
        printf("�ļ�����ʧ��\n");
        return;
    }
    fprintf(fp,"%d %d\n",year,month);
    fclose(fp);
}

//��ʾ�����ɱ�����
void printCalendara(int year)
{
    digitToImage(year);
    int a=1, i=1, j=1, n=1, k, t, w, z;
    static int d[13][78];
    int m[14] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    char wst[] = " Sun Mon Yue Wed Thu Fri Sat   ";

    if(year%4==0 && year%100!=0 || year%400==0)  //����Ķ���Ϊ29��
        m[2] = 29;
    w = (year+(year-1)/4-(year-1)/100+(year-1)/400)%7; //����y��Ԫ��Ϊ����w
    for(i=1; i<=12; i++)
    {
        a = 1;
        for(j=1; j<=6; j++)
        {
            for(k=0; k<=6; k++)
            {
                while(k<w) k=k+1;
                d[i][j*10+k] = a;  //����i�µĵ�j�����ڵ�����w������Ϊa
                a=a+1;
                w = k+1;
                if(w==7) w=0;
                if(a>m[i]) break;
            }
            if(a>m[i]) break;
        }
    }

    for(k=1; k<=16*x-3; k++)
    {
        printf(" ");
    }

    printf("=====%d=====\n", year);   //��ӡ���

    //��ӡ�º�
    for(n=1; n<=12/x; n++)
    {
        t = x*(n-1)+1;
        printf("\n    ");

        for(z=1; z<=x; z++)
        {
            for(k=1; k<=15; k++)
            {
                printf(" ");
            }

            printf("%2d", t+z-1);   //��ӡ�º�

            //Ϊ�ұߴ�ӡ���º�׼���ո�
            for(k=1; k<=14; k++)
            {
                printf(" ");
            }
        }

        printf("\n      ");


        for(z=1; z<=x; z++)      //��һ����x���¸�ʽ��ӡ
        {
            printf("%s", wst);   //��ӡ���ڱ���
        }

        for(j=1; j<=6; j++)
        {
            printf("\n  ");

            for(i=t; i<=t+x-1; i++)
            {
                printf("   ");

                for(k=0; k<=6; k++)
                {
                    if(d[i][j*10+k]==0) //��ȱ����λ�ô�ӡ�ո�
                    {
                        printf("    ");
                    }
                    else
                    {
                        printf("%4d", d[i][j*10+k]); //��ӡ����
                    }
                }
            }
            
          	printf("\n  ");
			for(i=t; i<=t+x-1; i++)
            {
                printf("   ");

                for(k=0; k<=6; k++)
                {
                    if(d[i][j*10+k]==0) //��ȱ����λ�ô�ӡ�ո�
                    {
                        printf("    ");
                    }
                    else
                    {
                        checkHoliday(year, i, d[i][j*10+k]); //��ӡ����
                    }
                }
            }
        }

    }

    FILE *fp;
    fp=fopen("year.txt","w+");
    if(fp==NULL)
    {
        printf("�ļ�����ʧ��\n");
        return;
    }
    fprintf(fp,"%d\n",year);
    fclose(fp);
    
}

//��ʾ����
void printCalendar(int year)
{
	digitToImage(year);
    FILE *fp;
    char saveYear[1024],temp[100];
    int a, i, j, n, k, t, w, x,  z;
    static int d[13][78];
    int m[14] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    char wst[] = " Sun Mon Yue Wed Thu Fri Sat   ";

	int judge = 1;
	
	
    if(year%4==0 && year%100!=0 || year%400==0)  //����Ķ���Ϊ29��
        m[2] = 29;
    w = (year+(year-1)/4-(year-1)/100+(year-1)/400)%7; //����y��Ԫ��Ϊ����w
    for(i=1; i<=12; i++)
    {
        a = 1;
        for(j=1; j<=6; j++)
        {
            for(k=0; k<=6; k++)
            {
                while(k<w) k=k+1;
                d[i][j*10+k] = a;  //����i�µĵ�j�����ڵ�����w������Ϊa
                a=a+1;
                w = k+1;
                if(w==7) w=0;
                if(a>m[i]) break;
            }
            if(a>m[i]) break;
        }
    }

    x=2;

    fp=fopen("year1.txt","w+");
    if(fp==NULL)
    {
        printf("���ļ�ʧ��\n");
        return;
    }

    for(k=1; k<=16*x-3; k++)
    {
        printf(" ");
        strcat(saveYear," ");
    }

    itoa(year,temp,10);

    strcat(saveYear,"=====");
    strcat(saveYear,temp);
    strcat(saveYear,"=====");
    fprintf(fp,"%s\n",saveYear);
    memset(temp,0,sizeof(temp));
    memset(saveYear,0,sizeof(saveYear));

    //��ӡ�º�
    for(n=1; n<=12/x; n++)
    {
        t = x*(n-1)+1;
        printf("\n    ");

        //����
        strcat(temp,"");
        fprintf(fp,"\n%s",temp);
        memset(temp,0,sizeof(temp));

        for(z=1; z<=x; z++)
        {
            for(k=1; k<=15; k++)
            {
                printf(" ");
                strcat(saveYear," ");
            }

            printf("%2d", t+z-1);   //��ӡ�º�

            sprintf(temp,"%2d",t+z-1);
            strcat(saveYear,temp);
            memset(temp,0,sizeof(temp));

            for(k=1; k<=14; k++)
            {
                printf(" ");
                strcat(saveYear," ");
            }
        }

        fprintf(fp,"%s",saveYear);
        memset(temp,0,sizeof(temp));
        memset(saveYear,0,sizeof(saveYear));

        printf("\n      ");

        //����
        strcat(temp,"");
        fprintf(fp,"\n%s",temp);
        memset(temp,0,sizeof(temp));

        strcat(saveYear,"      ");

        for(z=1; z<=x; z++)      //��һ����x���¸�ʽ��ӡ
        {
            printf("%s", wst);   //��ӡ���ڱ���
            strcat(saveYear,wst);
        }

        //������ڱ���
        fprintf(fp,"%s",saveYear);
        memset(saveYear,0,sizeof(saveYear));

        for(j=1; j<=6; j++)
        {
            printf("\n  ");

            //����
            strcat(temp,"");
            fprintf(fp,"\n%s",temp);
            memset(temp,0,sizeof(temp));

            strcat(saveYear,"  ");

            for(i=t; i<=t+x-1; i++)
            {
                printf("   ");

                strcat(saveYear,"   ");
				
				
				
                for(k=0; k<=6; k++)
                {
                    if(d[i][j*10+k]==0) //��ȱ����λ�ô�ӡ�ո�
                    {
                        printf("    ");
                        strcat(saveYear,"    ");
                    }
                    else
                    {
                        printf("%4d", d[i][j*10+k]); //��ӡ����

                        sprintf(temp,"%4d",d[i][j*10+k]);
                        strcat(saveYear,temp);
                        memset(temp,0,sizeof(temp));
                        
                    }         
                }
                
                	              
            }
            
            
            //����
            printf("\n");
        	strcat(temp,"");
        	fprintf(fp,"\n%s",temp);
        	memset(temp,0,sizeof(temp));
            
            strcat(saveYear,"  ");

            for(i=t; i<=t+x-1; i++)
            {
            	if(judge%2 == 1){
            		printf("      ");
                	strcat(saveYear,"      ");
				}else if(judge%2 == 0){
					printf("  ");
                	strcat(saveYear,"  ");
				}

				
                for(k=0; k<=6; k++)
                {
                    if(d[i][j*10+k]==0) //��ȱ����λ�ô�ӡ�ո�
                    {
                        printf("    ");
                        strcat(saveYear,"    ");
                    }
                    else
                    {
						checkHolidayPrintYear(year, i, d[i][j*10+k],saveYear);
                        
                    }                   
                }
				judge++;              	              
            }
            
            
            
            fprintf(fp,"%s\n",saveYear);
            memset(saveYear,0,sizeof(saveYear));
        }
    }
    fclose(fp);

    fp=fopen("year.txt","w+");
    if(fp==NULL)
    {
        printf("�ļ�����ʧ��\n");
        return;
    }
    fprintf(fp,"%d\n",year);
    fclose(fp);

}



void getLocalTime(time_t timep,struct tm *p)
{
    time(&timep);
    p=localtime(&timep);
    year=p->tm_year+1900;
    month=p->tm_mon+1;
    day=p->tm_mday;
    hour=p->tm_hour;
    minutes=p->tm_min;
    second=p->tm_sec;
    weekday=p->tm_wday;

    printCalendar(year,month);
    printf("\n");
    printf("\t\t������: %d-%d-%d  %s\n",year,month,day,week[weekday]);
    printf("\t\t��ǰʱ����: %d:%d:%d   \n\n",hour,minutes,second);
}

//��ʾ�ϴβ鿴������
void showLastMonth()
{
    FILE *fp;
    fp=fopen("month.txt","a+");
    if(fp==NULL)
    {
        printf("���ļ�ʧ��\n");
        return;
    }
    fscanf(fp,"%d %d\n",&year,&month);
    fclose(fp);
    printCalendar(year,month);
}

//��ʾ�ϴβ鿴������
void showLastYear()
{
    FILE *fp;
    fp=fopen("year.txt","a+");
    if(fp==NULL)
    {
        printf("���ļ�ʧ��\n");
        return;
    }
    fscanf(fp,"%d\n",&year);
    fclose(fp);
    printCalendar(year);
}


//������ת��Ϊ�ַ����
void digitToImage(int year)
{
    int i,j,k;
    int y[4]={0};
	y[0]=year/1000;
	y[1]=(year-y[0]*1000)/100;
	y[2]=(year-y[0]*1000-y[1]*100)/10;
	y[3]=year%10;
	char b[10][7][7]={
	{"****  ","*  *  ","*  *  ","*  *  ","*  *  ","*  *  ","****  "},
	{"   *  ","   *  ","   *  ","   *  ","   *  ","   *  ","   *  "},
	{"****  ","   *  ","   *  ","****  ","*     ","*     ","****  "},
	{"****  ","   *  ","   *  ","****  ","   *  ","   *  ","****  "},
	{"*  *  ","*  *  ","*  *  ","****  ","   *  ","   *  ","   *  "},
    {"****  ","*     ","*     ","****  ","   *  ","   *  ","****  "},
    {"****  ","*     ","*     ","****  ","*  *  ","*  *  ","****  "},
    {"****  ","   *  ","   *  ","   *  ","   *  ","   *  ","   *  "},
    {"****  ","*  *  ","*  *  ","****  ","*  *  ","*  *  ","****  "},
    {"****  ","*  *  ","*  *  ","****  ","   *  ","   *  ","****  "} };
	for(i=0;i<7;i++)
	{
		for(k=1; k<=16*x-7; k++)
    {
        printf(" ");
    }                      
	    for(j=0;j<4;j++)
		{
			
			printf("%s",b[y[j]][i]);
		}
		printf("\n");
	}
}


void checkHolidayPrintMonth(int year, int month, int day,char *saveMon)
{
	if(year > 1911 && month == 1 && day == 1){
		printf("Ԫ��");
		strcat(saveMon, "Ԫ��");
	}else if(year > 1949 && month == 3 && day == 8){
		printf("��Ů��");
		strcat(saveMon, "��Ů��");
	}else if(year > 1979 && month == 3 && day == 12){
		printf("ֲ����");
		strcat(saveMon, "ֲ����");
	}else if(month == 4 && day == 5){
		printf("������");
		strcat(saveMon, "������");
	}else if(year > 1949 && month == 5 && day == 1){
		printf("�Ͷ���");
		strcat(saveMon, "�Ͷ���");
	}else if(year > 1939 && month == 5 && day == 4){
		printf("�����"); 
		strcat(saveMon, "�����");
	}else if(year > 1949 && month == 6 && day == 1){
		printf("��ͯ��");
		strcat(saveMon, "��ͯ��");
	}else if(year > 1940 && month == 7 && day == 1){
		printf("������");
		strcat(saveMon, "������");
	}else if(year > 1949 && month == 10 && day == 1){
		printf("�����");
		strcat(saveMon, "�����");
	}else if(month == 12 && day == 25){
		printf("ʥ����");
		strcat(saveMon, "ʥ����");
	}else{
		printf("\t");
		strcat(saveMon, "\t");
	}
}


void checkHolidayPrintYear(int year, int month, int day,char *saveMon)
{
	if(year > 1911 && month == 1 && day == 1){
		printf("Ԫ��");
		strcat(saveMon, "Ԫ��");
	}else if(year > 1949 && month == 3 && day == 8){
		printf("��Ů��");
		strcat(saveMon, "��Ů��");
	}else if(year > 1979 && month == 3 && day == 12){
		printf("ֲ����");
		strcat(saveMon, "ֲ����");
	}else if(month == 4 && day == 5){
		printf("������");
		strcat(saveMon, "������");
	}else if(year > 1949 && month == 5 && day == 1){
		printf("�Ͷ���");
		strcat(saveMon, "�Ͷ���");
	}else if(year > 1939 && month == 5 && day == 4){
		printf("�����"); 
		strcat(saveMon, "�����");
	}else if(year > 1949 && month == 6 && day == 1){
		printf("��ͯ��");
		strcat(saveMon, "��ͯ��");
	}else if(year > 1940 && month == 7 && day == 1){
		printf("������");
		strcat(saveMon, "������");
	}else if(year > 1949 && month == 10 && day == 1){
		printf("�����");
		strcat(saveMon, "�����");
	}else if(month == 12 && day == 25){
		printf("ʥ����");
		strcat(saveMon, "ʥ����");
	}else{
		printf("    ");
		strcat(saveMon, "    ");
	}
}



void checkHoliday(int year, int month, int day)
{
	if(year > 1911 && month == 1 && day == 1){
		printf("Ԫ��");

	}else if(year > 1949 && month == 3 && day == 8){
		printf("��Ů��");
		 
	}else if(year > 1979 && month == 3 && day == 12){
		printf("ֲ����");
		
	}else if(month == 4 && day == 5){
		printf("������");
		
	}else if(year > 1949 && month == 5 && day == 1){
		printf("�Ͷ���");
		
	}else if(year > 1939 && month == 5 && day == 4){
		printf("�����"); 
		
	}else if(year > 1949 && month == 6 && day == 1){
		printf("��ͯ��");
		
	}else if(year > 1940 && month == 7 && day == 1){
		printf("������");
		
	}else if(year > 1949 && month == 10 && day == 1){
		printf("�����");
		
	}else if(month == 12 && day == 25){
		printf("ʥ����");
		
	}else{
		printf("    ");
		
	}
}









