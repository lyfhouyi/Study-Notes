#include <iostream>
#include "ChicagoPizzaIngredientFactory.h"

using namespace std;

Dough * ChicagoPizzaIngredientFactory::createDough()
{
	cout << "ChicagoPizzaIngredientFactory：取得了 ThickCrustDough" << endl;
	return new ThickCrustDough;
}

Clams * ChicagoPizzaIngredientFactory::createClam()
{
	cout << "ChicagoPizzaIngredientFactory：取得了 FrozenClams" << endl;
	return new FrozenClams;
}

Sauce * ChicagoPizzaIngredientFactory::createSauce()
{
	cout << "ChicagoPizzaIngredientFactory：取得了 PlumTomatoSauce" << endl;
	return new PlumTomatoSauce;
}

ChicagoPizzaIngredientFactory::~ChicagoPizzaIngredientFactory()
{
	cout << "~ChicagoPizzaIngredientFactory" << endl;
}
