#include <iostream>
#include "GumballMachine.h"

using namespace std;

int main()
{
	GumballMachine GumballMachineA(2);
	GumballMachine GumballMachineB(0);
	cout << &GumballMachineA << "\n" << &GumballMachineB << endl;

	GumballMachineA.insertQuater();
	GumballMachineA.turnCrank();
	GumballMachineA.insertQuater();
	GumballMachineA.turnCrank();

	cout << "--------------------" << endl;

	GumballMachineB.refill(1);
	GumballMachineB.insertQuater();
	GumballMachineB.turnCrank();

	cout << "--------------------" << endl;

	return 0;
}