int x,y,z;
void showchar(int,int,...);
main()
{
 x=8;
 y=2;
 z=7;
 showchar(x,y,'a','b','c','d','e','f','g','h');
}
void showchar(int n,int color,...)
{
 int a,b;
 b=color+z;
 for(a=0;a!=n;a++)
 {
  *(char far *)(0xb8000000+160*10+80+a+a)=*(int *)(_BP+8+a+a);
  *(char far *)(0xb8000000+160*10+81+a+a)=b;
 }
}
