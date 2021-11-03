#include "HouseBlend.h"

HouseBlend::HouseBlend(Size size) :Beverage(size)
{
	this->description = "House Blend Coffee";
}

double HouseBlend::cost()
{
	switch (this->getSize())
	{
	case Beverage::TALL:
		return 0.89;
	case Beverage::GRANDE:
		return 1.28;
	default:
		return 1.67;
	}
}
