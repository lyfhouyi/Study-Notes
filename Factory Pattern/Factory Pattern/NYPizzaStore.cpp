#include "NYPizzaStore.h"

Pizza * NYPizzaStore::createPizza(string type)
{
	Pizza *pizza = nullptr;
	PizzaIngredientFactory * pizzaIngredientFactory = new NYPizzaIngredientFactory;
	if (type == "clam")
	{
		pizza = new ClamPizza(pizzaIngredientFactory);
		pizza->setName("NYPizzaStore ʹ�� NYPizzaIngredientFactory ��ԭ�������� ClamPizza");
	}
	else if (type == "cheese")
	{
		pizza = new CheesePizza(pizzaIngredientFactory);
		pizza->setName("NYPizzaStore ʹ�� NYPizzaIngredientFactory ��ԭ�������� CheesePizza");
	}
	return pizza;
}
