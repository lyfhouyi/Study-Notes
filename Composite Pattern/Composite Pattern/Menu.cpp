#include <iostream>
#include "Menu.h"

using namespace std;

Menu::Menu(string name, string description) :MenuComponent(), menuComponents(set<MenuComponent *>())
{
	this->name = name;
	this->description = description;
}

string Menu::getName()
{
	return this->name;
}

string Menu::getDescription()
{
	return this->description;
}

void Menu::add(MenuComponent * menuComponent)
{
	this->menuComponents.insert(menuComponent);
}

void Menu::remove(MenuComponent * menuComponent)
{
	this->menuComponents.erase(menuComponent);
}

void Menu::print()
{
	cout << "\n" << this->getName() << ", " << this->getDescription() << "��----------��ʼ��ӡ----------" << endl;
	for (auto menuComponent : this->menuComponents)
	{
		menuComponent->print();
	}
	cout << "----------��ӡ����----------" << endl;
}

Menu::~Menu()
{
	cout << "~Menu" << endl;

}
