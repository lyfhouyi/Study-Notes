#include <iostream>
#include "Menu.h"
#include "MenuItem.h"
#include "Waitress.h"

using namespace std;

int main()
{
	MenuComponent *pancakeHouseMenu = new Menu("PANCAKE HOUSE MENU", "Breakfast");
	MenuComponent *dinerMenu = new Menu("DINER MENU", "Lunch");
	MenuComponent *dessertMenu = new Menu("DESSERT MENU", "Dessert of course!");

	MenuComponent *allMenus = new Menu("ALL MENUS", "All menus combined");
	allMenus->add(pancakeHouseMenu);
	allMenus->add(dinerMenu);

	MenuComponent *menuItemPancakeHouse1 = new MenuItem("����˵�������1", "����˵�������1", true, 6.48);
	MenuComponent *menuItemPancakeHouse2 = new MenuItem("����˵�������2", "����˵�������2", true, 7.48);
	MenuComponent *menuItemPancakeHouse3 = new MenuItem("����˵�������3", "����˵�������3", true, 8.48);
	pancakeHouseMenu->add(menuItemPancakeHouse1);
	pancakeHouseMenu->add(menuItemPancakeHouse2);
	pancakeHouseMenu->add(menuItemPancakeHouse3);

	MenuComponent *menuItemDessertMenu1 = new MenuItem("���˵�������1", "���˵�������1", true, 3.85);
	MenuComponent *menuItemDessertMenu2 = new MenuItem("���˵�������2", "���˵�������2", true, 4.85);
	MenuComponent *menuItemDessertMenu3 = new MenuItem("���˵�������3", "���˵�������3", true, 5.85);
	dessertMenu->add(menuItemDessertMenu1);
	dessertMenu->add(menuItemDessertMenu2);
	dessertMenu->add(menuItemDessertMenu3);

	MenuComponent *menuItemDinerMenu1 = new MenuItem("�����˵�������1", "�����˵�������1", true, 17.21);
	MenuComponent *menuItemDinerMenu2 = new MenuItem("�����˵�������2", "�����˵�������2", true, 18.21);
	dinerMenu->add(dessertMenu);
	dinerMenu->add(menuItemDinerMenu1);
	dinerMenu->add(menuItemDinerMenu2);

	Waitress waitress(allMenus);
	waitress.printMenu();

	cout << "��ʼ�ͷ�" << endl;
	delete menuItemPancakeHouse1;
	delete menuItemPancakeHouse2;
	delete menuItemPancakeHouse3;

	delete menuItemDessertMenu1;
	delete menuItemDessertMenu2;
	delete menuItemDessertMenu3;

	delete menuItemDinerMenu1;
	delete menuItemDinerMenu2;

	delete pancakeHouseMenu;
	delete dinerMenu;
	delete dessertMenu;
	delete allMenus;

	return 0;
}