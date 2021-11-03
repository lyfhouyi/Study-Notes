#include "Soy.h"

Soy::Soy(Beverage * beverage) :CondimentDecorator()
{
	this->beverage = beverage;
	this->size = this->beverage->getSize();
}

string Soy::getDescription()
{
	return this->beverage->getDescription() + ", Soy";
}

double Soy::cost()
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
