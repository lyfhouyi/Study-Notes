//此为 菜单项 类

#pragma once
#include<string>

using namespace std;

class MenuItem
{
private:
	string name;
	string description;
	bool vegetarian;
	double price;
public:
	MenuItem(string name, string description, bool vegetarian, double price);
	string getName();
	string getDescription();
	bool isVegetarian();
	double getPrice();
	~MenuItem();
};

