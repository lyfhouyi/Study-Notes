//��Ϊ ŦԼԭ�Ϲ��� ��

#pragma once
#include "PizzaIngredientFactory.h"

class NYPizzaIngredientFactory :public PizzaIngredientFactory
{
public:
	virtual Dough *createDough();
	virtual Clams *createClams();
	virtual Sauce *createSauce();
};

