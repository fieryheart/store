#include<stdio.h>
#include<stdlib.h>
#include<time.h>
#include<conio.h>
#include<string.h>
#include<windows.h>
const char *week[]={"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
const char *month_sel[]={"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"};
int year,month,day,hour,minutes,second,weekday;
int x=2; //每行显示月数

const int isLeap(int year);  //判断是否为闰年
const int getMonthDays(int year,int month);  //计算某年某月的天数
const int yearDays(int year);  //计算某年的天数
void printCalendar(int year,int month);  //打印某年某月的日历
void printCalendar(int year); //打印某年的日历
void printCalendara(int year);  //显示年历可变行数
void sleep(); //延时程序
void getLocalTime(time_t timep,struct tm *p); //获取当地时间
void showLastMonth();  //显示上次查看的月历
void showLastYear();  //显示上次查看的年历
void digitToImage(int year);  //将数字转化为字符输出
void checkHolidayPrintMonth(int year, int month, int day,char *saveMon); // 检测一月中年月日并输出 
void checkHolidayPrintYear(int year, int month, int day, char *saveMon); // 检测一年中年月日并输出 
void checkHoliday(int year, int month, int day); // 检测年月日不输出

int main()
{
    printf("********************************************\n");
	printf("*                                          *\n");
	printf("*                万年历查询                *\n");
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
    printf("=======               菜单           =======\n");
    printf("=======1、显示当前时间和当月月历          ==\n");
    printf("=======2、输入年份查询并存入文件          ==\n");
    printf("=======3、输入年份查询年历和每行显示月数  ==\n");
    printf("=======4、显示上次查看的月历              ==\n");
    printf("=======5、显示上次查看的年历              ==\n");
    scanf("%d",&func);
	getchar();

        switch(func)
        {
        //当月月历
        case 1:
            getLocalTime(timep,p);
            break;
        case 2:
            do{ 
            printf("请输入年份");
            scanf("%d",&year);
            getchar();
            }while(year<=1900||year>=3000); 
            printCalendar(year);
            break;
        //输入年份查询
        case 3:
        do{
            printf("请输入年份和每行显示的月份数(<=4)");
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

//判断?year?是否是润年??返回?1?为闰年
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

//计算?year?年的?month?月是多少天?*返回值：整型，天数
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

//计算?year?年的天数
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

//判断?year?年?month?月?day?天时星期几,返回值:0,1,2,3,4,5,6
const int isWeek(int year,int month,int day)
{
    int days=0;
    int i;
    //计算前?year?年有多少天
    for(i=1;i<year;i++)
    {
        days=days+yearDays(i);
    }
    //计算?year?年的前?month?个月有多少天
    for(i=1;i<month;i++)
    {
        days=days+getMonthDays(year,i);
    }
    //从公元?1?年
    days=days+day;
    return days%7;
}

//按日历的格式打印?year?年?month?月的日历
void printCalendar(int year,int month)
{
	digitToImage(year);
    FILE *fp;
    char saveMon[1024],temp[100];
    fp=fopen("month1.txt","w+");
    if(fp==NULL)
    {
        printf("文件创建失败\n");
        return;
    }

    int i,j;
    int row=0,row1=0;
	// 得到一个月的天数
	int days = getMonthDays(year, month);
	// 判断每一行的开头day 
	int headDay = 1; 
    //把数字转为字符输出
    digitToImage(year);

    printf("                       %s\n",month_sel[month]);
    printf("---------------------------------------------------\n");
    fprintf(fp,"                       %s\n",month_sel[month]);
    fprintf(fp,"---------------------------------------------------\n");

    //打印星期
    for(i=0;i<7;i++)
    {
        printf("%s\t",week[i]);
        strcat(saveMon,week[i]);
        strcat(saveMon,"\t");
    }
    fprintf(fp,"%s\n",saveMon);
    memset(saveMon,0,sizeof(saveMon));

    printf("\n");

    //判断?year?年?month?月?1?日时星期几
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

        //如果是星期六就换行打印日期
        if(isWeek(year,month,i+1)==6)
        {
            row ++;
            printf("\n");
            fprintf(fp,"%s\n",saveMon);
            memset(saveMon,0,sizeof(saveMon));
            
            // 输出节日 
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
        printf("文件创建失败\n");
        return;
    }
    fprintf(fp,"%d %d\n",year,month);
    fclose(fp);
}

//显示年历可变行数
void printCalendara(int year)
{
    digitToImage(year);
    int a=1, i=1, j=1, n=1, k, t, w, z;
    static int d[13][78];
    int m[14] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    char wst[] = " Sun Mon Yue Wed Thu Fri Sat   ";

    if(year%4==0 && year%100!=0 || year%400==0)  //闰年的二月为29天
        m[2] = 29;
    w = (year+(year-1)/4-(year-1)/100+(year-1)/400)%7; //计算y年元旦为星期w
    for(i=1; i<=12; i++)
    {
        a = 1;
        for(j=1; j<=6; j++)
        {
            for(k=0; k<=6; k++)
            {
                while(k<w) k=k+1;
                d[i][j*10+k] = a;  //计算i月的第j个星期的星期w的日期为a
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

    printf("=====%d=====\n", year);   //打印年号

    //打印月号
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

            printf("%2d", t+z-1);   //打印月号

            //为右边打印的月号准备空格
            for(k=1; k<=14; k++)
            {
                printf(" ");
            }
        }

        printf("\n      ");


        for(z=1; z<=x; z++)      //按一横排x个月格式打印
        {
            printf("%s", wst);   //打印星期标题
        }

        for(j=1; j<=6; j++)
        {
            printf("\n  ");

            for(i=t; i<=t+x-1; i++)
            {
                printf("   ");

                for(k=0; k<=6; k++)
                {
                    if(d[i][j*10+k]==0) //空缺日期位置打印空格
                    {
                        printf("    ");
                    }
                    else
                    {
                        printf("%4d", d[i][j*10+k]); //打印日期
                    }
                }
            }
            
          	printf("\n  ");
			for(i=t; i<=t+x-1; i++)
            {
                printf("   ");

                for(k=0; k<=6; k++)
                {
                    if(d[i][j*10+k]==0) //空缺日期位置打印空格
                    {
                        printf("    ");
                    }
                    else
                    {
                        checkHoliday(year, i, d[i][j*10+k]); //打印节日
                    }
                }
            }
        }

    }

    FILE *fp;
    fp=fopen("year.txt","w+");
    if(fp==NULL)
    {
        printf("文件创建失败\n");
        return;
    }
    fprintf(fp,"%d\n",year);
    fclose(fp);
    
}

//显示年历
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
	
	
    if(year%4==0 && year%100!=0 || year%400==0)  //闰年的二月为29天
        m[2] = 29;
    w = (year+(year-1)/4-(year-1)/100+(year-1)/400)%7; //计算y年元旦为星期w
    for(i=1; i<=12; i++)
    {
        a = 1;
        for(j=1; j<=6; j++)
        {
            for(k=0; k<=6; k++)
            {
                while(k<w) k=k+1;
                d[i][j*10+k] = a;  //计算i月的第j个星期的星期w的日期为a
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
        printf("打开文件失败\n");
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

    //打印月号
    for(n=1; n<=12/x; n++)
    {
        t = x*(n-1)+1;
        printf("\n    ");

        //换行
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

            printf("%2d", t+z-1);   //打印月号

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

        //换行
        strcat(temp,"");
        fprintf(fp,"\n%s",temp);
        memset(temp,0,sizeof(temp));

        strcat(saveYear,"      ");

        for(z=1; z<=x; z++)      //按一横排x个月格式打印
        {
            printf("%s", wst);   //打印星期标题
            strcat(saveYear,wst);
        }

        //输出星期标题
        fprintf(fp,"%s",saveYear);
        memset(saveYear,0,sizeof(saveYear));

        for(j=1; j<=6; j++)
        {
            printf("\n  ");

            //换行
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
                    if(d[i][j*10+k]==0) //空缺日期位置打印空格
                    {
                        printf("    ");
                        strcat(saveYear,"    ");
                    }
                    else
                    {
                        printf("%4d", d[i][j*10+k]); //打印日期

                        sprintf(temp,"%4d",d[i][j*10+k]);
                        strcat(saveYear,temp);
                        memset(temp,0,sizeof(temp));
                        
                    }         
                }
                
                	              
            }
            
            
            //换行
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
                    if(d[i][j*10+k]==0) //空缺日期位置打印空格
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
        printf("文件创建失败\n");
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
    printf("\t\t今天是: %d-%d-%d  %s\n",year,month,day,week[weekday]);
    printf("\t\t当前时间是: %d:%d:%d   \n\n",hour,minutes,second);
}

//显示上次查看的月历
void showLastMonth()
{
    FILE *fp;
    fp=fopen("month.txt","a+");
    if(fp==NULL)
    {
        printf("打开文件失败\n");
        return;
    }
    fscanf(fp,"%d %d\n",&year,&month);
    fclose(fp);
    printCalendar(year,month);
}

//显示上次查看的年历
void showLastYear()
{
    FILE *fp;
    fp=fopen("year.txt","a+");
    if(fp==NULL)
    {
        printf("打开文件失败\n");
        return;
    }
    fscanf(fp,"%d\n",&year);
    fclose(fp);
    printCalendar(year);
}


//将数字转化为字符输出
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
		printf("元旦");
		strcat(saveMon, "元旦");
	}else if(year > 1949 && month == 3 && day == 8){
		printf("妇女节");
		strcat(saveMon, "妇女节");
	}else if(year > 1979 && month == 3 && day == 12){
		printf("植树节");
		strcat(saveMon, "植树节");
	}else if(month == 4 && day == 5){
		printf("清明节");
		strcat(saveMon, "清明节");
	}else if(year > 1949 && month == 5 && day == 1){
		printf("劳动节");
		strcat(saveMon, "劳动节");
	}else if(year > 1939 && month == 5 && day == 4){
		printf("青年节"); 
		strcat(saveMon, "青年节");
	}else if(year > 1949 && month == 6 && day == 1){
		printf("儿童节");
		strcat(saveMon, "儿童节");
	}else if(year > 1940 && month == 7 && day == 1){
		printf("建党节");
		strcat(saveMon, "建党节");
	}else if(year > 1949 && month == 10 && day == 1){
		printf("国庆节");
		strcat(saveMon, "国庆节");
	}else if(month == 12 && day == 25){
		printf("圣诞节");
		strcat(saveMon, "圣诞节");
	}else{
		printf("\t");
		strcat(saveMon, "\t");
	}
}


void checkHolidayPrintYear(int year, int month, int day,char *saveMon)
{
	if(year > 1911 && month == 1 && day == 1){
		printf("元旦");
		strcat(saveMon, "元旦");
	}else if(year > 1949 && month == 3 && day == 8){
		printf("妇女节");
		strcat(saveMon, "妇女节");
	}else if(year > 1979 && month == 3 && day == 12){
		printf("植树节");
		strcat(saveMon, "植树节");
	}else if(month == 4 && day == 5){
		printf("清明节");
		strcat(saveMon, "清明节");
	}else if(year > 1949 && month == 5 && day == 1){
		printf("劳动节");
		strcat(saveMon, "劳动节");
	}else if(year > 1939 && month == 5 && day == 4){
		printf("青年节"); 
		strcat(saveMon, "青年节");
	}else if(year > 1949 && month == 6 && day == 1){
		printf("儿童节");
		strcat(saveMon, "儿童节");
	}else if(year > 1940 && month == 7 && day == 1){
		printf("建党节");
		strcat(saveMon, "建党节");
	}else if(year > 1949 && month == 10 && day == 1){
		printf("国庆节");
		strcat(saveMon, "国庆节");
	}else if(month == 12 && day == 25){
		printf("圣诞节");
		strcat(saveMon, "圣诞节");
	}else{
		printf("    ");
		strcat(saveMon, "    ");
	}
}



void checkHoliday(int year, int month, int day)
{
	if(year > 1911 && month == 1 && day == 1){
		printf("元旦");

	}else if(year > 1949 && month == 3 && day == 8){
		printf("妇女节");
		 
	}else if(year > 1979 && month == 3 && day == 12){
		printf("植树节");
		
	}else if(month == 4 && day == 5){
		printf("清明节");
		
	}else if(year > 1949 && month == 5 && day == 1){
		printf("劳动节");
		
	}else if(year > 1939 && month == 5 && day == 4){
		printf("青年节"); 
		
	}else if(year > 1949 && month == 6 && day == 1){
		printf("儿童节");
		
	}else if(year > 1940 && month == 7 && day == 1){
		printf("建党节");
		
	}else if(year > 1949 && month == 10 && day == 1){
		printf("国庆节");
		
	}else if(month == 12 && day == 25){
		printf("圣诞节");
		
	}else{
		printf("    ");
		
	}
}









