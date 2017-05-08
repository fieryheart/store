#include <iostream>
using namespace std;


int main()
{
	int arr[5000];
	int x, y;
	int i = 0 , j = 0;
	while(cin >> arr[i]){
		i++;
	}
	do{
		x = arr[j++];
		y = arr[j++];
		cout << x+y << endl;
	}while(arr[j] && arr[j+1]);
	return 0;
}