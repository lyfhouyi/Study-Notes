#include "LightOffCommand.h"

LightOffCommand::LightOffCommand(Light * light)
{
	this->light = light;
}

void LightOffCommand::execute()
{
	this->light->off();
}

void LightOffCommand::undo()
{
	this->light->on();
}
