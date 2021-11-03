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
	cout << "~ClamPizza��pizzaIngredientFactory ���ͷ�" << endl;
}

void CheesePizza::prepare()
{
	cout << "CheesePizza��׼�� " << this->name << endl;
	this->dough = this->pizzaIngredientFactory->createDough();
	this->sauce = this->pizzaIngredientFactory->createSauce();
}
