#include <iostream>
#include "MenuItem.h"

using namespace std;

MenuItem::MenuItem(string name, string description, bool vegetarian, double price)
{
	this->name = name;
	this->description = description;
	this->vegetarian = vegetarian;
	this->price = price;
}

string MenuItem::getName()
{
	return this->name;
}

string MenuItem::getDescription()
{
	return this->description;
}

bool MenuItem::isVegetarian()
{
	return this->vegetarian;
}

double MenuItem::getPrice()
{
	return this->price;
}

MenuItem::~MenuItem()
{
	cout << "~MenuItem" << endl;
}
