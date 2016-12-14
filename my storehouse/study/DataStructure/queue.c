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

void CreateQueue(Queue *q, int maxsize);//����һ���յĶ���
int  IsEmpty(Queue q);//�ж������Ƿ�Ϊ�գ��ѿշ���true,���򷵻�false 
int  IsFull(Queue q);//�ж������Ƿ����ˣ���������true,���򷵻�false
void Append(Queue *q, T x);//�ڶ���δ��������½����� 
void Serve(Queue *q);//�ڶ��зǿյ�����³����� 
void QueueFront(Queue q, T* x);

int main(){
	
	return 0;
}


//ѭ������ʵ�� 
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
