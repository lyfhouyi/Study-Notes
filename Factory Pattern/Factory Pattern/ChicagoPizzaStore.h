//��Ϊ ֥�Ӹ������ ��

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

