//此为 菜单 抽象基类
#include "Iterator.h"

#pragma once
class Menu
{
public:
	virtual Iterator * createIterator() = 0;
	virtual ~Menu();
};

