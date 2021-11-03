#pragma once
#include "Beverage.h"

class DarkRoast :public Beverage
{
public:
	DarkRoast(Size size = TALL);
	virtual double cost();
};

