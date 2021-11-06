//��Ϊ �������� ��

#pragma once
#include "Command.h"
#include "Light.h"

class LightOnCommand :public Command
{
private:
	Light *light;
public:
	LightOnCommand(Light *light);
	virtual void execute();
	virtual void undo();
};