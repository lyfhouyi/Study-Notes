//此为 芝加哥比萨店 类

#pragma once
#include "PizzaStore.h"
#include "PizzaIngredientFactorys.h"
#include "Pizzas.h"

class ChicagoPizzaStore :public PizzaStore
{
public:
	ChicagoPizzaStore() :PizzaStore() {}
private:
	virtual Pizza *createPizza(string type);
};

