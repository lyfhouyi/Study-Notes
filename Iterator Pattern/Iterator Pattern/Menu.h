//��Ϊ �˵� �������
#include "Iterator.h"

#pragma once
class Menu
{
public:
	virtual Iterator * createIterator() = 0;
	virtual ~Menu();
};

