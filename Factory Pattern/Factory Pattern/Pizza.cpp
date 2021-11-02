#include <iostream>
#include "Pizza.h"

string Pizza::getName()
{
	return this->name;
}

void Pizza::setName(string name)
{
	this->name = name;
}

void Pizza::bake()
{
	cout << "烤比萨" << endl;
}

void Pizza::cut()
{
	cout << "切比萨" << endl;
}

void Pizza::box()
{
	cout << "比萨装盒" << endl;
}
