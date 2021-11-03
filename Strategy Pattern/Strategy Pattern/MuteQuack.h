//此为 不叫 的算法

#pragma once
#include "QuackBehavior.h"

class MuteQuack :public QuackBehavior
{
public:
	~MuteQuack();
	virtual void quack();
};

