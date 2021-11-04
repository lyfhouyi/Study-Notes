#include <iostream>
#include "ChocolateBoiler.h"

using namespace std;

ChocolateBoiler & ChocolateBoiler::getInstance()
{
	static ChocolateBoiler chocolateBoiler;
	cout << "getInstance��" << &chocolateBoiler << endl;
	return chocolateBoiler;
}

ChocolateBoiler::~ChocolateBoiler()
{
	cout << "~ChocolateBoiler" << endl;
}

ChocolateBoiler::ChocolateBoiler()
{
	cout << "ChocolateBoiler" << endl;
}