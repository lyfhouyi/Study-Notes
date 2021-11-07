#include "HomeTheaterFacade.h"

void HomeTheaterFacade::watchMovie()
{
	this->popcornPopper.on();
	this->popcornPopper.pop();
	this->screen.down();
	this->dvdPlayer.on();
}

void HomeTheaterFacade::endMovie()
{
	this->popcornPopper.off();
	this->screen.up();
	this->dvdPlayer.off();
}
