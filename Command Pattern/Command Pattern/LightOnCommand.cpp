#include "LightOnCommand.h"

LightOnCommand::LightOnCommand(Light * light)
{
	this->light = light;
}

void LightOnCommand::execute()
{
	this->light->on();
}

void LightOnCommand::undo()
{
	this->light->off();
}
