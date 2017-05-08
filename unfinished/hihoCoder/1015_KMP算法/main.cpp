#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <ctime>
#include <string>
using namespace std;


int KMP(string shortStr, string longStr)
{
    int shortSize = shortStr.size();
    int longSize = longStr.size();
    int next[shortSize];
    int amount = 0;



    next[0] = -1;

    int shortIndex = 0;
    int publicLength = -1;

    // 构建next数组
    // cout << "构建next数组" << endl;

    while(shortIndex < shortSize)
    {
        if(publicLength == -1 || shortStr[shortIndex] == shortStr[publicLength])
        {
            shortIndex++;
            publicLength++;
            next[shortIndex] = publicLength;
        }else
        {
            publicLength = next[publicLength];
        }
    }


    //  开始匹配

    // cout << "开始匹配" << endl;

    int longIndex = 0;
    // 匹配位置
    int pos = 0;
    shortIndex = 0;
    while(longIndex < longSize)
    {
        if(longStr[longIndex] == shortStr[shortIndex])
        {
            longIndex++;
            shortIndex++;
        }else
        {
            pos = pos + shortIndex - next[shortIndex];
            shortIndex = 0;
            longIndex = pos;
        }

        if(shortIndex == shortSize)
        {
            amount++;
        }

        if(pos > longSize - shortIndex - 1)
        {
            break;
        }
    }

    return amount;

}

int main()
{
    // 测试次数
    int testAmt;
    scanf("%d", &testAmt);



    // 匹配
    /*
    while(testAmt--)
    {
        // 子串
        string shortStr;
        // 主串
        string longStr;

        cin >> shortStr;
        cin >> longStr;

        cout << KMP(shortStr, longStr) << endl;

    }
    */

    while(testAmt--)
    {
        string shortStr = "ABC";
        string longStr = "";

        srand(time(0));
        for(int i = 0; i < 1000000; i++)
        {
            longStr += 'A' + rand() % ('Z' - 'A');
        }
        printf("%d\n", KMP(shortStr, longStr));
    }


    return 0;
}

