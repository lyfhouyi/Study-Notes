#include "NYPizzaIngredientFactory.h"

Dough * NYPizzaIngredientFactory::createDough()
{
	return new ThinCrustDough;
}

Clams * NYPizzaIngredientFactory::createClams()
{
	return new FreshClams;
}

Sauce * NYPizzaIngredientFactory::createSauce()
{
	return new MarinaraSauce;
}
