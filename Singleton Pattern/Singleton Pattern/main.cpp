#include <iostream>
#include "ChocolateBoiler.h"

using namespace std;

int main()
{
	ChocolateBoiler& chocolateBoiler1 = ChocolateBoiler::getInstance();
	ChocolateBoiler& chocolateBoiler2 = ChocolateBoiler::getInstance();

	cout << &chocolateBoiler1 << endl;
	cout << &chocolateBoiler2 << endl;

	return 0;
}