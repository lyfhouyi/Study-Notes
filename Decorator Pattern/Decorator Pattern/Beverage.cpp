#include "Beverage.h"

Beverage::Beverage()
{
	this->description = "Unknown Beverage";
}

string Beverage::getDescription()
{
	return this->description;
}
