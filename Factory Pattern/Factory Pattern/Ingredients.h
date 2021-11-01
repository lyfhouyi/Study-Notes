#pragma once

class Clams
{
public:
	virtual void showName() = 0;
};
class FrozenClams :public Clams
{
public:
	virtual void showName() {}
};
class FreshClams :public Clams
{
public:
	virtual void showName() {}
};

class Dough
{
public:
	virtual void showName() = 0;
};
class ThickCrustDough :public Dough
{
public:
	virtual void showName() {}
};
class ThinCrustDough :public Dough
{
public:
	virtual void showName() {}
};

class Sauce
{
public:
	virtual void showName() = 0;
};
class PlumTomatoSauce :public Sauce
{
public:
	virtual void showName() {}
};
class MarinaraSauce :public Sauce
{
public:
	virtual void showName() {}
};