#include <iostream>
#include "ChicagoPizzaStore.h"

using namespace std;

ChicagoPizzaStore::~ChicagoPizzaStore()
{
	cout << "~ChicagoPizzaStore" << endl;
}

Pizza * ChicagoPizzaStore::createPizza(string type)
{
	Pizza *pizza = nullptr;
	PizzaIngredientFactory * pizzaIngredientFactory = new ChicagoPizzaIngredientFactory;
	if (type == "clam")
	{
		pizza = new ClamPizza(pizzaIngredientFactory);
		pizza->setName("createPizza：ChicagoPizzaStore 使用 ChicagoPizzaIngredientFactory 的原料生产的 ClamPizza");
	}
	else if (type == "cheese")
	{
		pizza = new CheesePizza(pizzaIngredientFactory);
		pizza->setName("createPizza：ChicagoPizzaStore 使用 ChicagoPizzaIngredientFactory 的原料生产的 CheesePizza");
	}
	return pizza;
}
