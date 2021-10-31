//此为 观察者 抽象基类

#pragma once
#include "Subject.h"

class Subject;

class Observer
{
public:
	virtual void update(Subject *, void *) = 0; // Subject * 用来拉数据，void * 用来推数据
	virtual ~Observer() {}
};

