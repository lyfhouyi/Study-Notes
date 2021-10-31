//此为 观察者展示行为 抽象基类

#pragma once
class DisplayElement
{
public:
	virtual void display() = 0;
	virtual ~DisplayElement() {}
};

