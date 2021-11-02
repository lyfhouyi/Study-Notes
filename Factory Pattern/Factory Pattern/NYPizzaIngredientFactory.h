//此为 纽约原料工厂 类

#pragma once
#include "PizzaIngredientFactory.h"

class NYPizzaIngredientFactory :public PizzaIngredientFactory
{
public:
	NYPizzaIngredientFactory() :PizzaIngredientFactory() {}
	virtual Dough *createDough();
	virtual Clams *createClam();
	virtual Sauce *createSauce();
};

