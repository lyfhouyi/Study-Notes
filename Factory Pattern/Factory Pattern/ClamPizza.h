//��Ϊ ���۱��� ��

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

