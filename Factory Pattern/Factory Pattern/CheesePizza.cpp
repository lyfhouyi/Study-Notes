#include <iostream>
#include "CheesePizza.h"

using namespace std;

CheesePizza::CheesePizza(PizzaIngredientFactory * pizzaIngredientFactory) :Pizza()
{
	this->pizzaIngredientFactory = pizzaIngredientFactory;
}

void CheesePizza::prepare()
{
	cout << "CheesePizza£º×¼±¸ " << this->name << endl;
	this->dough = this->pizzaIngredientFactory->createDough();
	this->sauce = this->pizzaIngredientFactory->createSauce();
}
