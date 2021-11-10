#include <iostream>
#include "Coffee.h"

using namespace std;

void Coffee::brew()
{
	cout << "ÓÃ·ÐË®³åÅÝ¿§·È" << endl;
}

void Coffee::addCondiments()
{
	cout << "¼ÓÌÇºÍÅ£ÄÌ" << endl;
}

bool Coffee::customerWantsCondiments()
{
	return false;
}
