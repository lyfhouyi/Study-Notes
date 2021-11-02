#include <iostream>
#include "ClamPizza.h"

using namespace std;

ClamPizza::ClamPizza(PizzaIngredientFactory * pizzaIngredientFactory) :Pizza()
{
	this->pizzaIngredientFactory = pizzaIngredientFactory;
}

void ClamPizza::prepare()
{
	cout << "ClamPizza£º×¼±¸ " << this->getName() << endl;
	this->dough = this->pizzaIngredientFactory->createDough();
	this->sauce = this->pizzaIngredientFactory->createSauce();
	this->clam = this->pizzaIngredientFactory->createClam();
}
