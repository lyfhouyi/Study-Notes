#include "DvdPlayer.h"
#include "PopcornPopper.h"
#include "Screen.h"

#pragma once
class HomeTheaterFacade
{
private:
	DvdPlayer dvdPlayer;
	PopcornPopper popcornPopper;
	Screen screen;
public:
	void watchMovie();
	void endMovie();
};

