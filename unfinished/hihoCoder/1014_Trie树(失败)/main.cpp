#include <iostream>
#include <String>
#include <time.h>
#include <stdlib.h>
using namespace std;
# define SIZE 26


// trie�Ľڵ�
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

	char element; // Ԫ��

	int endSize; // �洢�Դ˽��Ϊ��β���ִ��ĸ���

	int childrenSize; // �˽ڵ�ĺ�����Ŀ;

	TrieNode* children[SIZE]; // �������¼ָ���ӵ�ָ��
};

// trie��
class Trie
{
public:
	// ��ʼ��
	Trie()
    {
        root = new TrieNode('0');
	}

public:
	TrieNode* root;
};

// �����µĽڵ�, ��������ڵ�ĵ�ַ
TrieNode* newChildren(char children, TrieNode** p, int index)
{
	TrieNode* tn = new TrieNode(children);
	p[index] = tn;

    	//cout << "��ǰ����Ľڵ�ָ��Ϊ" << p[index] << "����Ԫ��Ϊ " << p[index]->element << endl;
	return p[index];
}

// ��ǰ�ڵ��Ƿ�������ַ�
TrieNode* isChildren(char children, TrieNode* parent)
{




    if(!parent->children[0])
    {
        // ���ӽڵ���Ŀ+1
        parent->childrenSize++;
        return newChildren(children, parent->children, 0);
    }
    else
    {

        TrieNode* p = parent->children[0];
        int i;
        for(i = 0; i < parent->childrenSize; i++)
        {
            // cout << "�����ж�" << endl;
            // cout << "��ǰ�Ƚϵ�Ԫ�أ�" << p->element << endl;
            if( (children - p->element) == 0 )
            {
                // cout << "���нڵ�" << endl;
                return p;
            }
            // ��һ�����ӽڵ�
            p = parent->children[i+1];

        }
        // ���ӽڵ���Ŀ+1
        parent->childrenSize++;
        // �����µ���ĸ�ڵ�
        return newChildren(children, parent->children, i);

    }


}


// �õ���ǰ�ڵ����µĽڵ�endSize�ĺ�
int gatherEndSize(TrieNode* p)
{
    int num = p->endSize;
	for(int i = 0 ; i < p->childrenSize; i++){
		num += gatherEndSize(p->children[i]);
	}

	return num;
}

// �Զ����������,(���Ҳ�������������)
void createStrings(string* words, int num)
{
    cout << "��ʼ" << endl;
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

	int inCount; // �ʵ�Ĵ�С
	int outCount; // ѯ�ʵĴ���
	int i,j;
	string word; // ����ĵ���

	//int amount = 50;
    //string words[amount];

	// ����Trie��
	Trie *trie = new Trie();
	//������ĸ��ĵ�ַ
	TrieNode* trieIndex = trie->root;

	//createStrings(words, amount);

	// �ֵ�Ĵ�С
    cin >> inCount;

	for(i = 0; i < inCount; i++)
	{
		// ���뵥��
		cin >> word;
		// ��������
		for(j = 0; j < word.size(); j++)
		{

			trieIndex = isChildren( word[j], trieIndex);

            // cout << "��ǰָ��ָ��Ľڵ�Ϊ��" << trieIndex << "����Ԫ��Ϊ " << trieIndex->element << endl;

			// ������ַ����Ľ�β���������еĽڵ�endSize+1
			if( j+1 == word.size() )
			{
				trieIndex->endSize++;
			}

		}

		// ��indexָ���ص�root
		trieIndex = trie->root;
		// cout << "indexָ��ص����ڵ㣺" << trieIndex << ", ���Ľڵ�Ϊ��" << trie->root << endl;


/*
            for(int k = 0 ; k < trie->root->childrenSize; k++)
            {
                cout << "���ĵ�" << k+1 << "���ӽڵ��ֵΪ" << trie->root->children[k]->element << endl;
            }
*/


	}

    // cout << "��������" << endl;

    // ������ѯ��ĸ
    // string queryWords[amount];
    // createStrings(queryWords, amount);

	cin >> outCount;
	int num[outCount];
	int noWord;

	// cout << "�������" << outCount << endl;

	for(i = 0; i < outCount; i++)
	{
	    // ������������
	    noWord = 0;

		cin >> word;

		TrieNode* p = trie->root;

        int index;
        TrieNode* parent;

		for(j = 0; j < word.size(); j++)
		{

			index = 0;

			// ��ǰ�ĺ��ӽڵ��Ƿ�͵�ǰ���ַ���ͬ

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


        // ��û�������ĸʱ
        if(noWord)
        {
            // cout << "û�з��ϵĵ���" << endl;
            num[i] = 0;
        }
        else
        {
            // cout << "�з��ϵĵ���" << endl;
            num[i] = gatherEndSize(p);
        }

	}

	for(i = 0; i < outCount; i++)
	{
		cout << num[i] << endl;
	}

	return 0;
}

