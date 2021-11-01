//此为 原料工厂 抽象基类

#pragma once
#include "Ingredients.h"

class PizzaIngredientFactory
{
public:
	virtual Dough *createDough() = 0;
	virtual Clams *createClams() = 0;
	virtual Sauce *createSauce() = 0;
};

