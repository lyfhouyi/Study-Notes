//��Ϊ ����Ա ��

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

