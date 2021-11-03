#include <iostream>
#include "ClamPizza.h"

using namespace std;

ClamPizza::ClamPizza(PizzaIngredientFactory * pizzaIngredientFactory) :Pizza()
{
	this->pizzaIngredientFactory = pizzaIngredientFactory;
}

ClamPizza::~ClamPizza()
{
	cout << "~ClamPizza" << endl;
	delete this->pizzaIngredientFactory;
	cout << "~ClamPizza：pizzaIngredientFactory 已释放" << endl;
}

void ClamPizza::prepare()
{
	cout << "ClamPizza：准备 " << this->getName() << endl;
	this->dough = this->pizzaIngredientFactory->createDough();
	this->sauce = this->pizzaIngredientFactory->createSauce();
	this->clam = this->pizzaIngredientFactory->createClam();
}
