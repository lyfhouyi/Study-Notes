#include "Squeak.h"
#include <iostream>

using namespace std;

Squeak::~Squeak()
{
	cout << "Squeak::~Squeak" << endl;
}

void Squeak::quack()
{
	cout << "֨֨��" << endl;
}
