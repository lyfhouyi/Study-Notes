#include <iostream>
#include "ChicagoPizzaIngredientFactory.h"

using namespace std;

Dough * ChicagoPizzaIngredientFactory::createDough()
{
	cout << "ChicagoPizzaIngredientFactory��ȡ���� ThickCrustDough" << endl;
	return new ThickCrustDough;
}

Clams * ChicagoPizzaIngredientFactory::createClam()
{
	cout << "ChicagoPizzaIngredientFactory��ȡ���� FrozenClams" << endl;
	return new FrozenClams;
}

Sauce * ChicagoPizzaIngredientFactory::createSauce()
{
	cout << "ChicagoPizzaIngredientFactory��ȡ���� PlumTomatoSauce" << endl;
	return new PlumTomatoSauce;
}

ChicagoPizzaIngredientFactory::~ChicagoPizzaIngredientFactory()
{
	cout << "~ChicagoPizzaIngredientFactory" << endl;
}
