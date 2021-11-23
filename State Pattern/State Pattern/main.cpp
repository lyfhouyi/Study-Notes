#include <iostream>
#include "GumballMachine.h"

using namespace std;

int main()
{
	GumballMachine g(10);
	GumballMachine h(10);
	cout << g.getHasQuarterState() << endl;
	cout << h.getHasQuarterState() << endl;
	return 0;
}