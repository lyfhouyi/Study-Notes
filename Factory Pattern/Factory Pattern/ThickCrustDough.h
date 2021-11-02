//此为 厚面饼 类

#pragma once
#include "Dough.h"
class ThickCrustDough : public Dough
{
public:
	ThickCrustDough() :Dough() {}
	virtual void whoAmI();
};

