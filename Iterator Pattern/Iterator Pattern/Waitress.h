//此为 服务员 类

#pragma once
#include <vector>
#include "MenuItem.h"
#include "Iterator.h"
#include "Menu.h"

using namespace std;

class Waitress
{
private:
	vector<Menu *> menus;
public:
	Waitress(const vector<Menu *>& menus);
	void printMenu();
	void printMenu(Iterator *iterator);
};

