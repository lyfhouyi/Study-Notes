#include <iostream>
#include <vector>
#include "Waitress.h"
#include "Menus.h"

using namespace std;

int main()
{
	vector<Menu *> menus;
	Menu * menu = nullptr;
	menu = new DinerMenu;
	menus.push_back(menu);
	menu = new CafeMenu;
	menus.push_back(menu);




	Waitress waitress(menus);
	waitress.printMenu();

	cout << "\n¿ªÊ¼ÊÍ·Å" << endl;
	for (Menu * &menu : menus)
	{
		delete menu;
		menu = nullptr;
	}

	return 0;
}