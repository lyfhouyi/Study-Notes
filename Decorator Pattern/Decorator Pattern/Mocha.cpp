#include "Mocha.h"

Mocha::Mocha(Beverage * beverage) :CondimentDecorator()
{
	this->beverage = beverage;
}

string Mocha::getDescription()
{
	return this->beverage->getDescription() + ", Mocha";
}

double Mocha::cost()
{
	return this->beverage->cost() + 0.1;
}

