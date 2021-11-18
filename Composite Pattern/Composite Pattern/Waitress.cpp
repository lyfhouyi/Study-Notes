#include "Waitress.h"

Waitress::Waitress(MenuComponent * allMenus)
{
	this->allMenus = allMenus;
}

void Waitress::printMenu()
{
	this->allMenus->print();
}
