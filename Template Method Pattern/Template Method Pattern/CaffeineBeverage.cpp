#include <iostream>
#include "CaffeineBeverage.h"

using namespace std;

void CaffeineBeverage::prepareRecipe()
{
	this->boilWater();
	this->brew();
	this->pourInCup();
	if (this->customerWantsCondiments())
		this->addCondiments();
}

void CaffeineBeverage::boilWater()
{
	cout << "把水煮沸" << endl;
}

void CaffeineBeverage::pourInCup()
{
	cout << "倒入杯中" << endl;
}

bool CaffeineBeverage::customerWantsCondiments()
{
	return true;
}
