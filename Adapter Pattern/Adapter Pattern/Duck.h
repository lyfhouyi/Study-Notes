//此为 鸭子 抽象基类

#pragma once
class Duck
{
public:
	virtual void quack() = 0;
	virtual void fly() = 0;
	virtual ~Duck() {}
};

