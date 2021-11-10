//此为 咖啡因饮料 抽象基类

#pragma once
class CaffeineBeverage
{
public:
	virtual void prepareRecipe() final;
	void boilWater();
	void pourInCup();
	virtual bool customerWantsCondiments();
	virtual void brew() = 0;
	virtual void addCondiments() = 0;
	virtual ~CaffeineBeverage() {}
};

