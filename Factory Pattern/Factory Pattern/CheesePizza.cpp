#include <iostream>
#include "CheesePizza.h"

using namespace std;

CheesePizza::CheesePizza(PizzaIngredientFactory * pizzaIngredientFactory) :Pizza()
{
	this->pizzaIngredientFactory = pizzaIngredientFactory;
}

CheesePizza::~CheesePizza()
{
	cout << "~CheesePizza" << endl;
	delete this->pizzaIngredientFactory;
	cout << "~ClamPizza：pizzaIngredientFactory 已释放" << endl;
}

void CheesePizza::prepare()
{
	cout << "CheesePizza：准备 " << this->name << endl;
	this->dough = this->pizzaIngredientFactory->createDough();
	this->sauce = this->pizzaIngredientFactory->createSauce();
}
