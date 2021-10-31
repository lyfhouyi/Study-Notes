#include "HouseBlend.h"

HouseBlend::HouseBlend() :Beverage()
{
	this->description = "House Blend Coffee";
}

double HouseBlend::cost()
{
	return 0.89;
}
