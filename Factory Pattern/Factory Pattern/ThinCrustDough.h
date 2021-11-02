//此为 薄面饼 类

#pragma once
#include "Dough.h"
class ThinCrustDough :public Dough
{
public:
	ThinCrustDough() :Dough() {}
	virtual void whoAmI();
};

