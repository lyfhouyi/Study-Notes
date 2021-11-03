//此为 蛤蜊比萨 类

#pragma once
#include "Pizza.h"
#include "PizzaIngredientFactory.h"

class ClamPizza :public Pizza
{
public:
	ClamPizza(PizzaIngredientFactory * pizzaIngredientFactory);
	~ClamPizza();
private:
	PizzaIngredientFactory * pizzaIngredientFactory;
	virtual void prepare();
};

