//��Ϊ ���� ���㷨

#pragma once
#include "QuackBehavior.h"

class MuteQuack :public QuackBehavior
{
public:
	~MuteQuack();
	virtual void quack();
};

