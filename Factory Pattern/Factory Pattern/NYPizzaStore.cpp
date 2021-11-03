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
		pizza->setName("NYPizzaStore ʹ�� NYPizzaIngredientFactory ��ԭ�������� ClamPizza");
	}
	else if (type == "cheese")
	{
		pizza = new CheesePizza(pizzaIngredientFactory);
		pizza->setName("NYPizzaStore ʹ�� NYPizzaIngredientFactory ��ԭ�������� CheesePizza");
	}
	delete pizzaIngredientFactory;
	cout << "pizzaIngredientFactory ���ͷ�" << endl;
	return pizza;
}
