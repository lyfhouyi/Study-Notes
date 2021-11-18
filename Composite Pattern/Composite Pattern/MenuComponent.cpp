#include <iostream>
#include "MenuComponent.h"

using namespace std;

string MenuComponent::getName()
{
	return "Error : getDescription() !";
}

string MenuComponent::getDescription()
{
	return "Error : getDescription() !";
}

double MenuComponent::getPrice()
{
	cout << "Error : getPrice() !" << endl;
	return 0.0;
}

bool MenuComponent::isVegetarian()
{
	cout << "Error : isVegetarian() !" << endl;
	return false;
}

void MenuComponent::print()
{
	cout << "Error : print() !" << endl;
}

void MenuComponent::add(MenuComponent * menuComponent)
{
	cout << "Error : add(MenuComponent *) !" << endl;
}

void MenuComponent::remove(MenuComponent * menuComponent)
{
	cout << "Error : remove(MenuComponent *) !" << endl;
}

MenuComponent::~MenuComponent()
{
	cout << "~MenuComponent" << endl;
}
