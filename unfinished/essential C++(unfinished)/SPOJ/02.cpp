#include <iostream>
#include <String>

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
	}

public:
	TrieNode* root;
};

// 建立新的节点, 返回这个节点的地址
TrieNode* newChildren(char children, TrieNode* p)
{
	TrieNode* tn = new TrieNode(children);
	p = tn;
	return p;
}

// 当前节点是否有这个字符
TrieNode* isChildren(char children, TrieNode* parent)
{
    if(parent->children[0])
    {
        return newChildren(children, parent->children[0]);
    }

	TrieNode* p = parent->children[0];

	while(p)
	{
		if( (children - p->element) == 0 )
		{
			return p;
		}
		else
		{
			p++;
		}
	}

	// 孩子节点数目+1
	parent->childrenSize++;
	// 创建新的字母节点
	return newChildren(children, p);

}


// 得到单词以下的节点endSize的和
int gatherEndSize(TrieNode* p)
{
	for(int i = 0 ; i < p->childrenSize; i++){
		gatherEndSize(p->children[i]);
		return p->endSize;
	}
}


int main()
{

	int inCount; // 词典的大小
	int outCount; // 询问的次数
	int i,j;
	string word; // 输入的单词

	// 创建Trie树
	Trie *trie = new Trie();
	//获得树的根的地址
	TrieNode* trieIndex = trie->root;

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

			// 如何是字符串的结尾，则将索引中的节点endSize+1
			if( j+1 == word.size() )
			{
				trieIndex->endSize++;
			}

		}
	}

    cout << "跳出输入" << endl;

	cin >> outCount;
	int num[outCount];

	cout << "输出数组" << outCount << endl;

	for(i = 0; i < outCount; i++)
	{
		cin >> word;

		TrieNode* p = trie->root;

		for(j = 0; j < word.size(); j++)
		{

            cout << "第一阶段" << endl;

			int index = 0;


			cout << "word[" << j << "]:" << word[j] << endl;
			cout << p->children[0]->element << endl;


			// 当前的孩子节点是否和当前的字符相同
			while(( word[j] - p->children[index]->element ) != 0 )
			{
			    cout << "第二阶段" << endl;

				index++;
			}

			p = p->children[index];

		}

		num[i] = gatherEndSize(p);
	}

	for(i = 0; i < outCount; i++)
	{
		cout << num[i] << endl;
	}

	return 0;
}
