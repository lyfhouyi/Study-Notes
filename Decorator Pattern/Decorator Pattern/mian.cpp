#include <iostream>
#include "Beverages.h"
#include "Condiments.h"

using namespace std;

int main()
{
	HouseBlend houseBlend(Beverage::Size::VENTI);
	Milk beverage(&houseBlend);
	Mocha beverage2(&beverage);

	cout << beverage2.cost() << endl;

	Soy beverage3(&beverage2);
	Soy beverage4(&beverage3);

	cout << beverage4.cost() << endl;

	cout << houseBlend.getDescription() << endl;
	cout << beverage.getDescription() << endl;
	cout << beverage2.getDescription() << endl;
	cout << beverage3.getDescription() << endl;
	cout << beverage4.getDescription() << endl;

	return 0;
}