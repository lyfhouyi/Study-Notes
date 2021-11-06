#include "GarageDoorDownCommand.h"

GarageDoorDownCommand::GarageDoorDownCommand(GarageDoor *garageDoor) :Command()
{
	this->garageDoor = garageDoor;
}

void GarageDoorDownCommand::execute()
{
	this->garageDoor->down();
}

void GarageDoorDownCommand::undo()
{
	this->garageDoor->up();
}
