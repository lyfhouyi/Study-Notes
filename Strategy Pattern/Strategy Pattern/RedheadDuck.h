//��Ϊ ��ͷѼ ����

#pragma once
#include "Duck.h"

class RedheadDuck :public Duck
{
public:
	RedheadDuck(FlyBehavior * fb, QuackBehavior * qb);
	~RedheadDuck();
	virtual void display();
};

