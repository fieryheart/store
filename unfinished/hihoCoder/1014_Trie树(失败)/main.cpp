#include <iostream>
#include <String>
#include <time.h>
#include <stdlib.h>
using namespace std;
# define SIZE 26


// trie的节点
class TrieNode
{
public:
	TrieNode(char e): element(e),endSize(0),childrenSize(0)
    {
        for(int i = 0; i < SIZE; i++)
        {
            children[i] = NULL;
        }
    }

	~TrieNode()
	{
		for(int i = 0; i < SIZE; i++)
		{
			delete children[i];
			children[i] = NULL;
		}
	}

public:

	char element; // 元素

	int endSize; // 存储以此结点为结尾的字串的个数

	int childrenSize; // 此节点的孩子数目;

	TrieNode* children[SIZE]; // 该数组记录指向孩子的指针
};

// trie树
class Trie
{
public:
	// 初始化
	Trie()
    {
        root = new TrieNode('0');
	}

public:
	TrieNode* root;
};

// 建立新的节点, 返回这个节点的地址
TrieNode* newChildren(char children, TrieNode** p, int index)
{
	TrieNode* tn = new TrieNode(children);
	p[index] = tn;

    	//cout << "当前存入的节点指针为" << p[index] << "，其元素为 " << p[index]->element << endl;
	return p[index];
}

// 当前节点是否有这个字符
TrieNode* isChildren(char children, TrieNode* parent)
{




    if(!parent->children[0])
    {
        // 孩子节点数目+1
        parent->childrenSize++;
        return newChildren(children, parent->children, 0);
    }
    else
    {

        TrieNode* p = parent->children[0];
        int i;
        for(i = 0; i < parent->childrenSize; i++)
        {
            // cout << "进入判断" << endl;
            // cout << "当前比较的元素：" << p->element << endl;
            if( (children - p->element) == 0 )
            {
                // cout << "已有节点" << endl;
                return p;
            }
            // 下一个孩子节点
            p = parent->children[i+1];

        }
        // 孩子节点数目+1
        parent->childrenSize++;
        // 创建新的字母节点
        return newChildren(children, parent->children, i);

    }


}


// 得到当前节点以下的节点endSize的和
int gatherEndSize(TrieNode* p)
{
    int num = p->endSize;
	for(int i = 0 ; i < p->childrenSize; i++){
		num += gatherEndSize(p->children[i]);
	}

	return num;
}

// 自动产生随机数,(随机也不是真正的随机)
void createStrings(string* words, int num)
{
    cout << "开始" << endl;
    srand(time(0));
    for(int i = 0; i < num; i++)
    {

        int random = rand()%10 + 1;

        srand(time(0));
        for(int j = 0; j < random; j++)
        {
            words[i] += 'a' + rand() % ('z' - 'a');
        }
        cout << words[i] << endl;
    }

}


int main()
{

	int inCount; // 词典的大小
	int outCount; // 询问的次数
	int i,j;
	string word; // 输入的单词

	//int amount = 50;
    //string words[amount];

	// 创建Trie树
	Trie *trie = new Trie();
	//获得树的根的地址
	TrieNode* trieIndex = trie->root;

	//createStrings(words, amount);

	// 字典的大小
    cin >> inCount;

	for(i = 0; i < inCount; i++)
	{
		// 输入单词
		cin >> word;
		// 解析单词
		for(j = 0; j < word.size(); j++)
		{

			trieIndex = isChildren( word[j], trieIndex);

            // cout << "当前指针指向的节点为：" << trieIndex << "，其元素为 " << trieIndex->element << endl;

			// 如何是字符串的结尾，则将索引中的节点endSize+1
			if( j+1 == word.size() )
			{
				trieIndex->endSize++;
			}

		}

		// 将index指针归回到root
		trieIndex = trie->root;
		// cout << "index指针回到根节点：" << trieIndex << ", 根的节点为：" << trie->root << endl;


/*
            for(int k = 0 ; k < trie->root->childrenSize; k++)
            {
                cout << "根的第" << k+1 << "孩子节点的值为" << trie->root->children[k]->element << endl;
            }
*/


	}

    // cout << "跳出输入" << endl;

    // 创建查询字母
    // string queryWords[amount];
    // createStrings(queryWords, amount);

	cin >> outCount;
	int num[outCount];
	int noWord;

	// cout << "输出数组" << outCount << endl;

	for(i = 0; i < outCount; i++)
	{
	    // 假设存在这个数
	    noWord = 0;

		cin >> word;

		TrieNode* p = trie->root;

        int index;
        TrieNode* parent;

		for(j = 0; j < word.size(); j++)
		{

			index = 0;

			// 当前的孩子节点是否和当前的字符相同

			while( p->children[index] && ( word[j] - p->children[index]->element ) != 0)
			{
				index++;
			}

            if(index == p->childrenSize)
            {
                noWord = 1;
                break;
            }
			p = p->children[index];

		}


        // 当没有这个字母时
        if(noWord)
        {
            // cout << "没有符合的单词" << endl;
            num[i] = 0;
        }
        else
        {
            // cout << "有符合的单词" << endl;
            num[i] = gatherEndSize(p);
        }

	}

	for(i = 0; i < outCount; i++)
	{
		cout << num[i] << endl;
	}

	return 0;
}

