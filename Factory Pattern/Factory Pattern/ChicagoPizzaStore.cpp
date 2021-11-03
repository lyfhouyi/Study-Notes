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
		pizza->setName("ChicagoPizzaStore ʹ�� ChicagoPizzaIngredientFactory ��ԭ�������� ClamPizza");
	}
	else if (type == "cheese")
	{
		pizza = new CheesePizza(pizzaIngredientFactory);
		pizza->setName("ChicagoPizzaStore ʹ�� ChicagoPizzaIngredientFactory ��ԭ�������� CheesePizza");
	}
	delete pizzaIngredientFactory;
	cout << "pizzaIngredientFactory ���ͷ�" << endl;
	return pizza;
}
