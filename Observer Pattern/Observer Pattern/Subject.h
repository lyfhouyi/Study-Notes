//此为 主题 抽象基类

#pragma once
#include "Observer.h"

class Subject
{
	virtual void registerObserver(Observer *o) = 0;
	virtual void removeObserver(Observer *o) = 0;
	virtual void notifyObservers() = 0;
};

