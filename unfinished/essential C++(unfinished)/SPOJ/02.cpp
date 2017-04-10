#include <iostream>

using namespace std;

#define Size 10

// trie的节点
class trieNode {
public:
	trieNode(): 	terminableSize(0),
			nodeSize(0),
			{
				for(int i = 0; i < Size; i++){
					children[i] = NULL;
				}
			}

	~trieNode()
	{
		for(int i = 0; i < Size; i++){
			delete children[i];
			children[i] = NULL;
		}
	}

public:
	// 存储以此结点为结尾的字串的个数
	int terminableSize;
	// 记录此结点孩子的个数	
	int nodeSize;
	// 该数组记录指向孩子的指针
	trieNode* children[Size];
}

// 树
template<class Type, int Size>
class trie
{
public:
	typedef trieNode<Size> Node;
	typedef trieNode<Size>* pNode;
	trie() : root(new Node){}

	template<class Iterator>
	void insert(Iterator beg, Iterator end);
	void insert(const char *str);

	template<class Iterator>
	bool find(Iterator beg, Iterator end);
	bool find(const char *str);

	template<class Iterator>
	bool downNodeAlone(Iterator beg);

	template<class Iterator>
	bool erase(Iterator beg, Iterator end);
	bool erase(const char *str);

	int sizeAll(pNode);
	int sizeNoneRedundant(pNode);
public:
	pNode root;
private:
	Type index;
}



int main(){

}