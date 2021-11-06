//此为 关灯命令 类

#pragma once
#include "Command.h"
#include "Light.h"

class LightOffCommand :public Command
{
private:
	Light *light;
public:
	LightOffCommand(Light *light);
	virtual void execute();
	virtual void undo();
};