//此为 咖啡厅菜单 类

#pragma once
#include <map>
#include "Menu.h"
#include "MenuItem.h"
#include "CafeMenuIterator.h"

using namespace std;

class CafeMenu :public Menu
{
private:
	map<string,MenuItem *> menuItems;
public:
	CafeMenu();
	void addItem(string name, string description, bool vegetarian, double price);
	virtual Iterator * createIterator();
	~CafeMenu();
};

