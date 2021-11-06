#include <algorithm>
#include "MacroCommand.h"

MacroCommand::MacroCommand(vector<Command*>& commands)
{
	this->commands = commands;
}

void MacroCommand::execute()
{
	for_each(this->commands.begin(), this->commands.end(), [this](Command * command) {
		command->execute();
	});
}

void MacroCommand::undo()
{
}
