//此为 芝士比萨 类

#pragma once
#include "Pizza.h"
#include "PizzaIngredientFactory.h"

class CheesePizza :public Pizza
{
public:
	CheesePizza(PizzaIngredientFactory * pizzaIngredientFactory);
private:
	PizzaIngredientFactory * pizzaIngredientFactory;
	virtual void prepare();
};