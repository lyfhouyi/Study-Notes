//此为 芝加哥原料工厂 类

#pragma once
#include "PizzaIngredientFactory.h"
class ChicagoPizzaIngredientFactory :public PizzaIngredientFactory
{
public:
	ChicagoPizzaIngredientFactory() :PizzaIngredientFactory() {}
	virtual Dough *createDough();
	virtual Clams *createClam();
	virtual Sauce *createSauce();
};

