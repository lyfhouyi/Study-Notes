//��Ϊ ֥�Ӹ�ԭ�Ϲ��� ��

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

