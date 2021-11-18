//此为 服务员 类

#pragma once
#include "MenuComponent.h"

class Waitress
{
private:
	MenuComponent * allMenus;
public:
	Waitress(MenuComponent * allMenus);
	void printMenu();
};

