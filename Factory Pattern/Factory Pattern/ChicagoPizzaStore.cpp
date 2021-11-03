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
		pizza->setName("ChicagoPizzaStore 使用 ChicagoPizzaIngredientFactory 的原料生产的 ClamPizza");
	}
	else if (type == "cheese")
	{
		pizza = new CheesePizza(pizzaIngredientFactory);
		pizza->setName("ChicagoPizzaStore 使用 ChicagoPizzaIngredientFactory 的原料生产的 CheesePizza");
	}
	delete pizzaIngredientFactory;
	cout << "pizzaIngredientFactory 已释放" << endl;
	return pizza;
}
