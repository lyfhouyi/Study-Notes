//此为 呱呱叫 的算法

#pragma once
#include "QuackBehavior.h"

class Quack :public QuackBehavior
{
public:
	~Quack();
	virtual void quack();
};

