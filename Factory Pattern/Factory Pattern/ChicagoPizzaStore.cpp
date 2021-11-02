#include "ChicagoPizzaStore.h"

Pizza * ChicagoPizzaStore::createPizza(string type)
{
	Pizza *pizza = nullptr;
	PizzaIngredientFactory * pizzaIngredientFactory = new ChicagoPizzaIngredientFactory;
	if (type == "clam")
	{
		pizza = new ClamPizza(pizzaIngredientFactory);
		pizza->setName("ChicagoPizzaStore ʹ�� ChicagoPizzaIngredientFactory ��ԭ�������� ClamPizza");
	}
	else if (type == "cheese")
	{
		pizza = new CheesePizza(pizzaIngredientFactory);
		pizza->setName("ChicagoPizzaStore ʹ�� ChicagoPizzaIngredientFactory ��ԭ�������� CheesePizza");
	}
	return pizza;
}
