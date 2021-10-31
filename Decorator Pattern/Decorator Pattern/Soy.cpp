#include "Soy.h"

Soy::Soy(Beverage * beverage) :CondimentDecorator()
{
	this->beverage = beverage;
}

string Soy::getDescription()
{
	return this->beverage->getDescription() + ", Soy";
}

double Soy::cost()
{
	return this->beverage->cost() + 0.1;
}
