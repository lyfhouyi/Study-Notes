#include <iostream>
#include "Beverages.h"
#include "Condiments.h"

using namespace std;

int main()
{
	HouseBlend houseBlend;
	Milk beverage(&houseBlend);
	Mocha beverage2(&beverage);
	Soy beverage3(&beverage2);
	Soy beverage4(&beverage3);
	cout << houseBlend.getDescription() << endl;
	cout << beverage.getDescription() << endl;
	cout << beverage2.getDescription() << endl;
	cout << beverage3.getDescription() << endl;
	cout << beverage4.getDescription() << endl;


	return 0;
}