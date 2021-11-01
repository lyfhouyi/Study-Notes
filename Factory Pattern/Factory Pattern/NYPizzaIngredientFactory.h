//此为 纽约原料工厂 类

#pragma once
#include "PizzaIngredientFactory.h"

class NYPizzaIngredientFactory :public PizzaIngredientFactory
{
public:
	virtual Dough *createDough();
	virtual Clams *createClams();
	virtual Sauce *createSauce();
};

