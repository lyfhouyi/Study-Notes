#include <iostream>
#include <string>
#include "Pizza.h"
#include "PizzaStores.h"

using namespace std;

int main()
{
	Pizza* pizza;
	cout << "�¶������� NYPizzaStore ����һ�� clam ����" << endl;
	PizzaStore *nyPizzaStore = new NYPizzaStore;
	pizza = nyPizzaStore->orderPizza("clam");
	delete pizza;
	cout << "pizza ���ͷ�" << endl;
	delete nyPizzaStore;
	cout << "nyPizzaStore ���ͷ�" << endl;
	/*cout << "main���� NYPizzaStore �õ��ˣ�" << pizza->getName() << endl;
	cout << endl;
	cout << "�¶������� ChicagoPizzaStore ����һ�� clam ����" << endl;
	PizzaStore *chicagoPizzaStore = new ChicagoPizzaStore;
	pizza = chicagoPizzaStore->orderPizza("clam");
	cout << "main���� ChicagoPizzaStore �õ��ˣ�" << pizza->getName() << endl;*/

	return 0;
}