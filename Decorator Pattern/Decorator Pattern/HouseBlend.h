#pragma once
#include "Beverage.h"

class HouseBlend :public Beverage
{
public:
	HouseBlend(Size size = TALL);
	virtual double cost();
};

