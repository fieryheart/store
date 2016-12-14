#include <stdio.h>
#include <malloc.h>
#define MaxSize 50
#define FALSE 0
#define TRUE  1
typedef int T;
typedef struct queue{
	int Front, Rear, MaxQueue;
	T Element[MaxSize];
}Queue;

void CreateQueue(Queue *q, int maxsize);//创建一个空的队列
int  IsEmpty(Queue q);//判定队列是否为空，已空返回true,否则返回false 
int  IsFull(Queue q);//判定队列是否满了，已满返回true,否则返回false
void Append(Queue *q, T x);//在队列未满的情况下进队列 
void Serve(Queue *q);//在队列非空的情况下出队列 
void QueueFront(Queue q, T* x);

int main(){
	
	return 0;
}


//循环队列实现 
void CreateQueue(Queue *q, int maxsize)
{
		q->Front = q->Rear = 0;
		q->MaxQueue = maxsize;
}

int IsEmpty(Queue q)
{
	return  q.Front == q.Rear;
}

int IsFull(Queue q)
{
	return (q.Rear+1) % q.MaxQueue == q.Front;
}

void Append(Queue *q, T x)
{
	if(IsFull(*q))
		printf("OverfLow");
	else
		q->Element[q->Rear = (q->Rear+1)%q->MaxQueue] = x;
}

void Serve(Queue *q)
{
	if(IsEmpty(*q))
		printf("Underflow");
	else
		q->Front = (q->Front+1)%q->MaxQueue;
}

void QueueFront(Queue q, T* x)
{
	if(IsEmpty(q))
		printf("Underflow");
	else
		*x = q.Element[(q.Front+1)%q.MaxQueue];
}
