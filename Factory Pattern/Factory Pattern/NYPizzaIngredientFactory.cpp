#include <iostream>
#include "NYPizzaIngredientFactory.h"

using namespace std;

Dough * NYPizzaIngredientFactory::createDough()
{
	cout << "NYPizzaIngredientFactory��ȡ���� ThinCrustDough" << endl;
	return new ThinCrustDough;
}

Clams * NYPizzaIngredientFactory::createClam()
{
	cout << "NYPizzaIngredientFactory��ȡ���� FreshClams" << endl;
	return new FreshClams;
}

Sauce * NYPizzaIngredientFactory::createSauce()
{
	cout << "NYPizzaIngredientFactory��ȡ���� MarinaraSauce" << endl;
	return new MarinaraSauce;
}
