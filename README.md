# Design Pattern
>  设计模式学习笔记，使用 c++ 实现各种设计模式。

## 设计模式的定义

模式是在某情境（context）下，针对某问题的某种解决方案。

## 模式类目

模式类目描述某个模式的意图、动机、可能应用该模式的地方、解决方案的设计以及使用后果（好的或坏的）。

## 模式分类

* 创建型：创建型模式的目的在于创建对象时将客户从所需要实例化的对象中解耦。
* 结构型：结构型模式的目的在于建立新的结构或新的功能。
* 行为型：行为型模式的目的在于对象之间的沟通与互连。

### 创建型模式

[单件模式 Singleton Pattern](https://github.com/lyfhouyi/Study-Notes/tree/Design-Pattern/Singleton%20Pattern)

[工厂模式（工厂方法、抽象工厂） Factory Pattern](https://github.com/lyfhouyi/Study-Notes/tree/Design-Pattern/Factory%20Pattern)

原型模式 Prototype Pattern

生成器模式 Builder Pattern

### 结构型模式

[装饰者模式 Decorator Pattern](https://github.com/lyfhouyi/Study-Notes/tree/Design-Pattern/Decorator%20Pattern)

[组合模式 Composite Pattern](https://github.com/lyfhouyi/Study-Notes/tree/Design-Pattern/Composite%20Pattern)

[代理模式 Proxy Pattern](https://github.com/lyfhouyi/Study-Notes/tree/Design-Pattern/Proxy%20Pattern)

[外观模式 Facade Pattern](https://github.com/lyfhouyi/Study-Notes/tree/Design-Pattern/Facade%20Pattern)

[适配器模式 Adapter Pattern](https://github.com/lyfhouyi/Study-Notes/tree/Design-Pattern/Adapter%20Pattern)

桥接模式 Bridge Pattern

蝇量模式 Flyweight Pattern

### 行为型模式

[策略模式 Strategy Pattern](https://github.com/lyfhouyi/Study-Notes/tree/Design-Pattern/Strategy%20Pattern)

[观察者模式 Observer Pattern](https://github.com/lyfhouyi/Study-Notes/tree/Design-Pattern/Observer%20Pattern)

[命令模式 Command Pattern](https://github.com/lyfhouyi/Study-Notes/tree/Design-Pattern/Command%20Pattern)

[模板方法模式 Template Method Pattern](https://github.com/lyfhouyi/Study-Notes/tree/Design-Pattern/Template%20Method%20Pattern)

[迭代器模式 Iterator Pattern](https://github.com/lyfhouyi/Study-Notes/tree/Design-Pattern/Iterator%20Pattern)

[状态模式 State Pattern](https://github.com/lyfhouyi/Study-Notes/tree/Design-Pattern/State%20Pattern)

责任链模式 Chain of Responsibility Pattern

解释器模式 Interpreter Pattern

中介者模式 Mediator Pattern

备忘录模式 Memento Pattern

访问者模式 Visitor Pattern

## 面向对象原则

1. 封装变化。
2. 多用组合，少用继承。
3. 针对接口编程，不针对实现编程。
4. 为交互对象之间的松耦合设计而努力。
5. 类应该对扩展开放，对修改关闭。
6. 依赖抽象，不要依赖具体类。
7. 只和朋友交谈。
8. 别找我，我会找你。
9. 类应该只有一个改变的理由。