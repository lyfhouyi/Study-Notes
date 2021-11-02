//��Ϊ ԭ�Ϲ��� �������

#pragma once
#include "Ingredients.h"

class PizzaIngredientFactory
{
public:
	virtual Dough *createDough() = 0;
	virtual Clams *createClam() = 0;
	virtual Sauce *createSauce() = 0;
	virtual ~PizzaIngredientFactory() {}
};

