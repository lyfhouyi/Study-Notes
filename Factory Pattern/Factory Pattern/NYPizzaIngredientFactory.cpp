#include <iostream>
#include "NYPizzaIngredientFactory.h"

using namespace std;

Dough * NYPizzaIngredientFactory::createDough()
{
	cout << "NYPizzaIngredientFactory：取得了 ThinCrustDough" << endl;
	return new ThinCrustDough;
}

Clams * NYPizzaIngredientFactory::createClam()
{
	cout << "NYPizzaIngredientFactory：取得了 FreshClams" << endl;
	return new FreshClams;
}

Sauce * NYPizzaIngredientFactory::createSauce()
{
	cout << "NYPizzaIngredientFactory：取得了 MarinaraSauce" << endl;
	return new MarinaraSauce;
}
