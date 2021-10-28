//此为 QuackBehavior 虚基类

#pragma once
class QuackBehavior
{
public:
	virtual void quack() = 0;
	virtual ~QuackBehavior();
};

