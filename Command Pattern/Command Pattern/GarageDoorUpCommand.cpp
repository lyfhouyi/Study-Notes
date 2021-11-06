#include "GarageDoorUpCommand.h"

GarageDoorUpCommand::GarageDoorUpCommand(GarageDoor *garageDoor) :Command()
{
	this->garageDoor = garageDoor;
}

void GarageDoorUpCommand::execute()
{
	this->garageDoor->up();
}

void GarageDoorUpCommand::undo()
{
	this->garageDoor->down();
}
