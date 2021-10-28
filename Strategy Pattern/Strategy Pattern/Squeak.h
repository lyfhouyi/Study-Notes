//此为 吱吱叫 的算法

#pragma once
#include "QuackBehavior.h"

class Squeak :public QuackBehavior
{
public:
	~Squeak();
	virtual void quack();
};

