#include <iostream>
#include "TurkeyAdapter.h"
#include "WildTurkey.h"
#include "MallardDuck.h"

using namespace std;

void testDuck(Duck * duck)
{
	duck->quack();
	duck->fly();
}

int main()
{
	MallardDuck mallardDuck;
	WildTurkey wildTurkey;
	TurkeyAdapter turkeyAdapter(&wildTurkey);

	turkeyAdapter.quack();
	turkeyAdapter.fly();
	//testDuck(&mallardDuck);
	//testDuck(&turkeyAdapter);

	return 0;
}