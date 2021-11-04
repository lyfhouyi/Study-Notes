#pragma once
class ChocolateBoiler
{
public:
	static ChocolateBoiler& getInstance();
	~ChocolateBoiler();
private:
	ChocolateBoiler();
	ChocolateBoiler& operator=(const ChocolateBoiler&) = delete;
	ChocolateBoiler(const ChocolateBoiler&) = delete;
};

