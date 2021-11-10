//´ËÎª ¿§·È Àà

#pragma once
#include "CaffeineBeverage.h"
class Coffee :public CaffeineBeverage
{
public:
	virtual void brew();
	virtual void addCondiments();
	virtual bool customerWantsCondiments();
};
