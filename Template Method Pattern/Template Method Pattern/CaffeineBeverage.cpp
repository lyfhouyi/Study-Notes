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
	cout << "��ˮ���" << endl;
}

void CaffeineBeverage::pourInCup()
{
	cout << "���뱭��" << endl;
}

bool CaffeineBeverage::customerWantsCondiments()
{
	return true;
}
