# 数字速算
bytedance 期间自己做的小游戏，游戏效果参见视频。

## 代码逻辑
使用纯代码制作 UI，采用硬编码，适用于 iPhone12 iOS15.0 。

### 私有变量/方法
```objc

@interface ViewController ()

@property(assign,nonatomic)int difficulty; //难度系数
@property(assign,nonatomic)int number1; //操作数1
@property(assign,nonatomic)int number2; //操作数2
@property(assign,nonatomic)int number3; //操作数3
@property(assign,nonatomic)int op1; //操作符1
@property(assign,nonatomic)int op2; //操作符2
@property(strong,nonatomic)NSArray *opsArray; //操作符对照表
@property(assign,nonatomic)BOOL isRun; //程序状态
@property(strong,nonatomic)NSTimer *timerGlobal; //全局计时器
@property(strong,nonatomic)NSTimer *timerSingle; //单题计时器
@property(assign,nonatomic)int timeGlobal; //游戏时间
@property(assign,nonatomic)int timeSingle; //单题时间

-(void)setUI; //构建 UI 界面
-(int)myRandomNumberBetween:(int)value1 and:(int)value2; //生成随机数
-(BOOL)isHard; //根据难度系数随机生成难度
-(int)compute; //根据随机生成的操作数、操作符计算结果
-(int)computeWithNumberLeft:(int)numberLeft andOperator:(int) operator andNumberRight:(int)numberRight; //计算单次运算结果
-(void)showStartAlert; //调出开始按钮弹窗
-(void)showStopAlert; //调出停止按钮弹窗

-(IBAction)newQuestion;
-(IBAction)gameStartOrStop;
-(IBAction)showResult;
-(IBAction)responseTotimerGlobal;
-(IBAction)responseTotimerSingle;

@property(weak,nonatomic)IBOutlet UILabel *lblNumberTimeGlobal;
@property(weak,nonatomic)IBOutlet UILabel *lblNumberTimeSingle;
@property(weak,nonatomic)IBOutlet UILabel *lblNumber1;
@property(weak,nonatomic)IBOutlet UILabel *lblNumber2;
@property(weak,nonatomic)IBOutlet UILabel *lblNumber3;
@property(weak,nonatomic)IBOutlet UILabel *lblNumberResult;
@property(weak,nonatomic)IBOutlet UILabel *lblOp1;
@property(weak,nonatomic)IBOutlet UILabel *lblOp2;
@property(weak,nonatomic)IBOutlet UILabel *lblOp3;
@property(weak,nonatomic)IBOutlet UIButton *btnQuestion;
@property(weak,nonatomic)IBOutlet UIButton *btnStartOrStop;
@property(weak,nonatomic)IBOutlet UIButton *btnResult;

@end

```

### UI界面
```objc

-(void)setUI
{
    //屏幕尺寸
    float screenWidth=[[UIScreen mainScreen] bounds].size.width;
    float screenHeight=[[UIScreen mainScreen] bounds].size.height;
    NSLog(@"屏幕尺寸：width = %f, height = %f",screenWidth,screenHeight);
    
    //背景色
    self.view.backgroundColor=[UIColor colorWithRed:255.0/255 green:235.0/255 blue:205.0/255 alpha:1];
    
    //控件
    UILabel *lblTmp;
    //UILabel 全局计时器
    lblTmp=[[UILabel alloc]initWithFrame:CGRectMake(0, 100, screenWidth, 40)];
    self.lblNumberTimeGlobal=lblTmp;
    self.lblNumberTimeGlobal.text=@"游戏时间";
    self.lblNumberTimeGlobal.backgroundColor=[UIColor colorWithRed:245.0/255 green:245.0/255 blue:245.0/255 alpha:1];
    [self.lblNumberTimeGlobal setFont:[UIFont systemFontOfSize:24]];
    self.lblNumberTimeGlobal.textAlignment=NSTextAlignmentCenter;
    [self.view addSubview:self.lblNumberTimeGlobal];
    
    //UILabel 单题计时器
    lblTmp=[[UILabel alloc]initWithFrame:CGRectMake(0, 150, screenWidth, 40)];
    self.lblNumberTimeSingle=lblTmp;
    self.lblNumberTimeSingle.text=@"单题计算时间";
    self.lblNumberTimeSingle.backgroundColor=[UIColor colorWithRed:245.0/255 green:245.0/255 blue:245.0/255 alpha:1];
    [self.lblNumberTimeSingle setFont:[UIFont systemFontOfSize:24]];
    self.lblNumberTimeSingle.textAlignment=NSTextAlignmentCenter;
    [self.view addSubview:self.lblNumberTimeSingle];
    
    //UILabel 操作数1
    lblTmp=[[UILabel alloc]initWithFrame:CGRectMake(0, 200, 50, 50)];
    self.lblNumber1=lblTmp;
    self.lblNumber1.text=@"0";
    self.lblNumber1.backgroundColor=[UIColor colorWithRed:245.0/255 green:245.0/255 blue:245.0/255 alpha:1];
    [self.lblNumber1 setFont:[UIFont systemFontOfSize:38]];
    self.lblNumber1.textAlignment=NSTextAlignmentCenter;
    [self.view addSubview:self.lblNumber1];
    
    //UILabel 操作数2
    lblTmp=[[UILabel alloc]initWithFrame:CGRectMake(100, 200, 50, 50)];
    self.lblNumber2=lblTmp;
    self.lblNumber2.text=@"0";
    self.lblNumber2.backgroundColor=[UIColor colorWithRed:245.0/255 green:245.0/255 blue:245.0/255 alpha:1];
    [self.lblNumber2 setFont:[UIFont systemFontOfSize:38]];
    self.lblNumber2.textAlignment=NSTextAlignmentCenter;
    [self.view addSubview:self.lblNumber2];
    
    //UILabel 操作数3
    lblTmp=[[UILabel alloc]initWithFrame:CGRectMake(200, 200, 50, 50)];
    self.lblNumber3=lblTmp;
    self.lblNumber3.text=@"0";
    self.lblNumber3.backgroundColor=[UIColor colorWithRed:245.0/255 green:245.0/255 blue:245.0/255 alpha:1];
    [self.lblNumber3 setFont:[UIFont systemFontOfSize:38]];
    self.lblNumber3.textAlignment=NSTextAlignmentCenter;
    [self.view addSubview:self.lblNumber3];
    
    //UILabel 运算符1
    lblTmp=[[UILabel alloc]initWithFrame:CGRectMake(50, 200, 50, 50)];
    self.lblOp1=lblTmp;
    self.lblOp1.text=@"+";
    //    self.lblOp1.backgroundColor=[UIColor colorWithRed:245.0/255 green:245.0/255 blue:245.0/255 alpha:1];
    [self.lblOp1 setFont:[UIFont systemFontOfSize:38]];
    self.lblOp1.textAlignment=NSTextAlignmentCenter;
    [self.view addSubview:self.lblOp1];
    
    //UILabel 运算符2
    lblTmp=[[UILabel alloc]initWithFrame:CGRectMake(150, 200, 50, 50)];
    self.lblOp2=lblTmp;
    self.lblOp2.text=@"+";
    //    self.lblOp2.backgroundColor=[UIColor colorWithRed:245.0/255 green:245.0/255 blue:245.0/255 alpha:1];
    [self.lblOp2 setFont:[UIFont systemFontOfSize:38]];
    self.lblOp2.textAlignment=NSTextAlignmentCenter;
    [self.view addSubview:self.lblOp2];
    
    //UILabel 运算符3
    lblTmp=[[UILabel alloc]initWithFrame:CGRectMake(250, 200, 50, 50)];
    self.lblOp3=lblTmp;
    self.lblOp3.text=@"=";
    //    self.lblOp3.backgroundColor=[UIColor colorWithRed:245.0/255 green:245.0/255 blue:245.0/255 alpha:1];
    [self.lblOp3 setFont:[UIFont systemFontOfSize:38]];
    self.lblOp3.textAlignment=NSTextAlignmentCenter;
    [self.view addSubview:self.lblOp3];
    
    //UILabel 结果
    lblTmp=[[UILabel alloc]initWithFrame:CGRectMake(300, 200, screenWidth-300,50)];
    self.lblNumberResult=lblTmp;
    self.lblNumberResult.text=@"?";
    self.lblNumberResult.backgroundColor=[UIColor colorWithRed:245.0/255 green:245.0/255 blue:245.0/255 alpha:1];
    [self.lblNumberResult setFont:[UIFont systemFontOfSize:38]];
    self.lblNumberResult.textAlignment=NSTextAlignmentCenter;
    [self.view addSubview:self.lblNumberResult];
    
    UIButton *btnTmp;
    //UIButton 出题
    btnTmp=[[UIButton alloc]initWithFrame:CGRectMake(0, 270, 120,50)];
    self.btnQuestion=btnTmp;
    [self.btnQuestion setTitle:@"出题" forState:UIControlStateNormal];
    self.btnQuestion.backgroundColor=[UIColor colorWithRed:245.0/255 green:245.0/255 blue:245.0/255 alpha:1];
    [self.btnQuestion.titleLabel setFont:[UIFont systemFontOfSize:26]];
    [self.btnQuestion setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
    [self.btnQuestion setTitleColor:[UIColor colorWithRed:192.0/255 green:192.0/255 blue:192.0/255 alpha:1] forState:UIControlStateHighlighted];
    [self.btnQuestion setTitleColor:[UIColor grayColor] forState:UIControlStateDisabled];
    [self.btnQuestion addTarget:self action:@selector(newQuestion) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:self.btnQuestion];
    
    //UIButton 开始
    btnTmp=[[UIButton alloc]initWithFrame:CGRectMake(135, 270, 120,50)];
    self.btnStartOrStop=btnTmp;
    [self.btnStartOrStop setTitle:@"开始" forState:UIControlStateNormal];
    self.btnStartOrStop.backgroundColor=[UIColor colorWithRed:0/255 green:250.0/255 blue:154.0/255 alpha:1];
    [self.btnStartOrStop.titleLabel setFont:[UIFont systemFontOfSize:26]];
    [self.btnStartOrStop setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
    [self.btnStartOrStop setTitleColor:[UIColor colorWithRed:192.0/255 green:192.0/255 blue:192.0/255 alpha:1] forState:UIControlStateHighlighted];
    [self.btnStartOrStop addTarget:self action:@selector(gameStartOrStop) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:self.btnStartOrStop];
    
    //UIButton 结果
    btnTmp=[[UIButton alloc]initWithFrame:CGRectMake(screenWidth-120, 270, 120,50)];
    self.btnResult=btnTmp;
    [self.btnResult setTitle:@"结果" forState:UIControlStateNormal];
    self.btnResult.backgroundColor=[UIColor colorWithRed:245.0/255 green:245.0/255 blue:245.0/255 alpha:1];
    [self.btnResult.titleLabel setFont:[UIFont systemFontOfSize:26]];
    [self.btnResult setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
    [self.btnResult setTitleColor:[UIColor colorWithRed:192.0/255 green:192.0/255 blue:192.0/255 alpha:1] forState:UIControlStateHighlighted];
    [self.btnResult setTitleColor:[UIColor grayColor] forState:UIControlStateDisabled];
    [self.btnResult addTarget:self action:@selector(showResult) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:self.btnResult];
}

```

###  按下出题按钮
```objc

-(IBAction)newQuestion
{
    NSLog(@"按下了出题按钮");
    self.btnQuestion.enabled=NO;
    self.btnResult.enabled=YES;
    self.lblNumberResult.text=@"?";
    
    //初始化并开启单题计时器
    self.timeSingle=-1;
    self.timerSingle=[NSTimer scheduledTimerWithTimeInterval:1.0 target:self selector:@selector(responseTotimerSingle) userInfo:nil repeats:YES];
    [[NSRunLoop mainRunLoop]addTimer:self.timerSingle forMode:NSDefaultRunLoopMode];
    [self.timerSingle fire];
    
    //生成随机操作数、操作符
    if([self isHard]==YES) //困难模式
    {
        NSLog(@"困难模式");
        self.number1=[self myRandomNumberBetween:0 and:20];
        self.number2=[self myRandomNumberBetween:10 and:20];
        self.number3=[self myRandomNumberBetween:0 and:20];
    }
    else //简单模式
    {
        NSLog(@"简单模式");
        self.number1=[self myRandomNumberBetween:0 and:10];
        self.number2=[self myRandomNumberBetween:0 and:20];
        self.number3=[self myRandomNumberBetween:0 and:10];
    }
    
    self.op1=[self isHard]==YES?2:([self isHard]==YES?1:0);
    self.op2=[self isHard]==YES?2:([self isHard]==YES?1:0);
    
    self.lblNumber1.text=[NSString stringWithFormat:@"%d",self.number1];
    self.lblNumber2.text=[NSString stringWithFormat:@"%d",self.number2];
    self.lblNumber3.text=[NSString stringWithFormat:@"%d",self.number3];
    
    self.lblOp1.text=[self.opsArray objectAtIndex:self.op1];
    self.lblOp2.text=[self.opsArray objectAtIndex:self.op2];
    
    NSLog(@"%d %@ %d %@ %d",self.number1,[self.opsArray objectAtIndex:self.op1],self.number2,[self.opsArray objectAtIndex:self.op2],self.number3);
}

```

### 按下结果按钮
```

-(IBAction)showResult
{
    NSLog(@"按下了结果按钮");
    self.btnResult.enabled=NO;
    self.btnQuestion.enabled=YES;
    int result=[self compute];
    self.lblNumberResult.text=[NSString stringWithFormat:@"%d",result];
    
    //销毁单题计时器
    self.timeSingle=-1;
    [self.timerSingle invalidate];
    self.timerSingle=nil;
}

```

### 按下开始/停止按钮
```objc

-(IBAction)gameStartOrStop
{
    if(self.isRun==NO)
    {
        NSLog(@"按下了开始按钮");
        
        //弹窗
        [self showStartAlert];
    }
    else
    {
        NSLog(@"按下了停止按钮");
        
        //暂停（全局，单题）计时器
        [self.timerGlobal setFireDate:[NSDate distantFuture]];
        [self.timerSingle setFireDate:[NSDate distantFuture]];
        
        //弹窗
        [self showStopAlert];
    }
}

```

### 开始/停止键的弹窗
```objc

-(void)showStartAlert
{
    UIAlertController *startAlert=[UIAlertController alertControllerWithTitle:@"确认开始吗？" message:@"按下开始后，游戏计时器立即启动" preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *confirm=[UIAlertAction actionWithTitle:@"开始" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        NSLog(@"按下了开始按钮");
        
        self.isRun=YES;
        [self.btnStartOrStop setTitle:@"停止" forState:UIControlStateNormal];
        
        //（全局、单题）时间清零
        self.timeGlobal=-1;
        self.timeSingle=-1;
        self.lblNumberTimeGlobal.text=@"0";
        self.lblNumberTimeSingle.text=@"0";
        
        //初始化并开启全局计时器
        self.timerGlobal=[NSTimer scheduledTimerWithTimeInterval:1.0 target:self selector:@selector(responseTotimerGlobal) userInfo:nil repeats:YES];
        [[NSRunLoop mainRunLoop]addTimer:self.timerGlobal forMode:NSDefaultRunLoopMode];
        [self.timerGlobal fire];
        
        self.btnQuestion.enabled=YES;
        self.btnResult.enabled=NO;
    }];
    UIAlertAction *cancel=[UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
        NSLog(@"按下了取消按钮");
    }];
    [startAlert addAction:confirm];
    [startAlert addAction:cancel];
    [self presentViewController:startAlert animated:YES completion:nil];
}
-(void)showStopAlert
{
    UIAlertController *stopAlert=[UIAlertController alertControllerWithTitle:@"确认停止吗？" message:@"按下停止后，游戏计时器清零" preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *confirm=[UIAlertAction actionWithTitle:@"停止" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        NSLog(@"按下了停止按钮");
        
        self.isRun=NO;
        [self.btnStartOrStop setTitle:@"开始" forState:UIControlStateNormal];
        
        //设置结束状态显示界面
        self.lblNumberTimeGlobal.text=[NSString stringWithFormat:@"上局游戏时间：  %d",self.timeGlobal];
        self.lblNumberTimeSingle.text=@"单题计算时间";
        self.lblOp1.text=@"+";
        self.lblOp2.text=@"+";
        self.lblNumber1.text=@"0";
        self.lblNumber2.text=@"0";
        self.lblNumber3.text=@"0";
        self.lblNumberResult.text=@"?";
        
        //（全局、单题）时间清零
        self.timeGlobal=-1;
        self.timeSingle=-1;
        
        //销毁（全局、单题）定时器
        [self.timerGlobal invalidate];
        self.timerGlobal=nil;
        [self.timerSingle invalidate];
        self.timerSingle=nil;
        
        self.btnQuestion.enabled=NO;
        self.btnResult.enabled=NO;
    }];
    UIAlertAction *cancel=[UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
        NSLog(@"按下了取消按钮");
        
        //重启（全局、单题）计时器
        [self.timerGlobal setFireDate:[NSDate now]];
        [self.timerSingle setFireDate:[NSDate now]];
    }];
    [stopAlert addAction:confirm];
    [stopAlert addAction:cancel];
    [self presentViewController:stopAlert animated:YES completion:nil];
}

```

### 计时器响应
```objc
-(IBAction)responseTotimerGlobal
{
    NSLog(@"%s---%lf",__func__,self.timerGlobal.timeInterval);
    self.timeGlobal=self.timeGlobal+1;
    self.lblNumberTimeGlobal.text=[NSString stringWithFormat:@"%d",self.timeGlobal];
}

-(IBAction)responseTotimerSingle
{
    NSLog(@"%s---%lf",__func__,self.timerSingle.timeInterval);
    self.timeSingle=self.timeSingle+1;
    self.lblNumberTimeSingle.text=[NSString stringWithFormat:@"%d",self.timeSingle];
}

```

### 计算结果
```objc

-(int)compute
{
    if(self.op2==2) //操作数 2 为乘法
    {
        int valueTmp=[self computeWithNumberLeft:self.number2 andOperator:self.op2 andNumberRight:self.number3];
        return [self computeWithNumberLeft:self.number1 andOperator:self.op1 andNumberRight:valueTmp];
    }
    else
    {
        int valueTmp=[self computeWithNumberLeft:self.number1 andOperator:self.op1 andNumberRight:self.number2];
        return [self computeWithNumberLeft:valueTmp andOperator:self.op2 andNumberRight:self.number3];
    }
}

-(int)computeWithNumberLeft:(int)numberLeft andOperator:(int) operator andNumberRight:(int)numberRight
{
    switch(operator)
    {
        case 0:return numberLeft+numberRight;
        case 1:return numberLeft-numberRight;
        default:return numberLeft*numberRight;
    }
}

```

### 试题难度分布由困难等级决定
```objc

-(int)myRandomNumberBetween:(int)value1 and:(int)value2
{
    int range=value2-value1+1;
    return arc4random()%range+value1;
}

-(BOOL)isHard
{
    if(self.difficulty>[self myRandomNumberBetween:0 and:99])
        return YES;
    else
        return NO;
}

```
