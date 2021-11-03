//此为 调料 抽象基类

#pragma once
#include "Beverage.h"

class CondimentDecorator :public Beverage
{
public:
	virtual string getDescription() = 0;
	virtual ~CondimentDecorator() {}
};

