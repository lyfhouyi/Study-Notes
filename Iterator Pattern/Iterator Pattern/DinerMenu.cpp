#include <iostream>
#include "DinerMenu.h"

using namespace std;

int DinerMenu::MAX_ITEMS = 6;
DinerMenu::DinerMenu() :Menu(), menuItems(vector<MenuItem *>())
{
	this->addItem("Vegetarian BLT", "(Fakin') Bacon with lettuce & tomato on whole wheat", true, 2.99);
	this->addItem("BLT", "Bacon with lettuce & tomato on whole wheat", false, 2.99);
	this->addItem("Soup of the day", "Soup of the day, with a side of potato salad", false, 3.29);
}

void DinerMenu::addItem(string name, string description, bool vegetarian, double price)
{
	if (this->menuItems.size() >= DinerMenu::MAX_ITEMS)
	{
		cout << "²Ëµ¥ÒÑÂú" << endl;
	}
	else
	{
		MenuItem * menuItem = new MenuItem(name, description, vegetarian, price);
		this->menuItems.push_back(menuItem);
	}
}

DinerMenu::~DinerMenu()
{
	cout << "~DinerMenu" << endl;
	for (MenuItem * &menuItem : this->menuItems)
	{
		delete menuItem;
		menuItem = nullptr;
	}
}
