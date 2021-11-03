#include <iostream>
#include "PizzaStore.h"

using namespace std;

Pizza * PizzaStore::orderPizza(string type)
{
	Pizza *pizza = this->createPizza(type);
	pizza->prepare();
	pizza->bake();
	pizza->cut();
	pizza->box();
	return pizza;
}

PizzaStore::~PizzaStore()
{
	cout << "~PizzaStore" << endl;
}
