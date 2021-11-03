#include <iostream>
#include "NYPizzaStore.h"

using namespace std;

NYPizzaStore::~NYPizzaStore()
{
	cout << "~NYPizzaStore" << endl;
}

Pizza * NYPizzaStore::createPizza(string type)
{
	Pizza *pizza = nullptr;
	PizzaIngredientFactory * pizzaIngredientFactory = new NYPizzaIngredientFactory;
	if (type == "clam")
	{
		pizza = new ClamPizza(pizzaIngredientFactory);
		pizza->setName("createPizza：NYPizzaStore 使用 NYPizzaIngredientFactory 的原料生产的 ClamPizza");
	}
	else if (type == "cheese")
	{
		pizza = new CheesePizza(pizzaIngredientFactory);
		pizza->setName("createPizza：NYPizzaStore 使用 NYPizzaIngredientFactory 的原料生产的 CheesePizza");
	}
	return pizza;
}
