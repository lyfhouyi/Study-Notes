#include "DarkRoast.h"

DarkRoast::DarkRoast() :Beverage()
{
	this->description = "Dark Roast Coffee";
}

double DarkRoast::cost()
{
	return 0.99;
}
