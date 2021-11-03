//此为 纽约比萨店 类

#pragma once
#include "PizzaStore.h"
#include "PizzaIngredientFactorys.h"
#include "Pizzas.h"

class NYPizzaStore :public PizzaStore
{
public:
	NYPizzaStore() :PizzaStore() {}
	~NYPizzaStore();
private:
	virtual Pizza *createPizza(string type);
};

