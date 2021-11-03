//此为 调料:加豆浆 类

#pragma once
#include "CondimentDecorator.h"

class Soy :public CondimentDecorator
{
private:
	Beverage *beverage;

public:
	Soy(Beverage *beverage);
	virtual string getDescription();
	virtual double cost();
};

