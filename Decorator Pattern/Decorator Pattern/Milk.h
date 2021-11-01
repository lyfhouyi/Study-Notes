//此为 调料:加奶 类

#pragma once
#include "CondimentDecorator.h"

class Milk :public CondimentDecorator
{
private:
	Beverage *beverage;

public:
	Milk(Beverage *beverage);
	virtual string getDescription();
	virtual double cost();
};

