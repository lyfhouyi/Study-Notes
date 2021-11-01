#include "Milk.h"

Milk::Milk(Beverage * beverage) :CondimentDecorator()
{
	this->beverage = beverage;
	this->size = this->beverage->getSize();
}

string Milk::getDescription()
{
	return this->beverage->getDescription() + ", Milk";
}

double Milk::cost()
{
	switch (this->getSize())
	{
	case Beverage::TALL:
		return this->beverage->cost() + 0.1;
	case Beverage::GRANDE:
		return this->beverage->cost() + 0.15;
	default:
		return this->beverage->cost() + 0.2;
	}
}
