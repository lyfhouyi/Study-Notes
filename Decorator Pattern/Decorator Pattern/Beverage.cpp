#include "Beverage.h"

Beverage::Beverage(Size size)
{
	this->size = size;
	this->description = "Unknown Beverage";
}

string Beverage::getDescription()
{
	return this->description;
}

Beverage::Size Beverage::getSize()
{
	return this->size;
}
