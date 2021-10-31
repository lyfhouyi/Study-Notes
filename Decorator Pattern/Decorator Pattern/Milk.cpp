#include "Milk.h"

Milk::Milk(Beverage * beverage) :CondimentDecorator()
{
	this->beverage = beverage;
}

string Milk::getDescription()
{
	return this->beverage->getDescription() + ", Milk";
}

double Milk::cost()
{
	return this->beverage->cost() + 0.1;
}
