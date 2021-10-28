//此为 不会飞 的算法

#pragma once
#include "FlyBehavior.h"
class FlyNoWay :public FlyBehavior
{
public:
	~FlyNoWay();
	virtual void fly();
};

