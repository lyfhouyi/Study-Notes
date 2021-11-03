#include <iostream>
#include <string>
#include "Pizza.h"
#include "PizzaStores.h"

using namespace std;

int main()
{
	Pizza* pizza;
	cout << "下订单：从 NYPizzaStore 购买一个 clam 比萨" << endl;
	PizzaStore *nyPizzaStore = new NYPizzaStore;
	pizza = nyPizzaStore->orderPizza("clam");
	delete pizza;
	cout << "pizza 已释放" << endl;
	delete nyPizzaStore;
	cout << "nyPizzaStore 已释放" << endl;
	/*cout << "main：从 NYPizzaStore 得到了：" << pizza->getName() << endl;
	cout << endl;
	cout << "下订单：从 ChicagoPizzaStore 购买一个 clam 比萨" << endl;
	PizzaStore *chicagoPizzaStore = new ChicagoPizzaStore;
	pizza = chicagoPizzaStore->orderPizza("clam");
	cout << "main：从 ChicagoPizzaStore 得到了：" << pizza->getName() << endl;*/

	return 0;
}