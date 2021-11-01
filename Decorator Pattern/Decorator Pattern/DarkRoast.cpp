#include "DarkRoast.h"

DarkRoast::DarkRoast(Size size) :Beverage(size)
{
	this->description = "Dark Roast Coffee";
}

double DarkRoast::cost()
{
	switch (this->getSize())
	{
	case Beverage::TALL:
		return 0.99;
	case Beverage::GRANDE:
		return 1.38;
	default:
		return 1.77;
	}
}
