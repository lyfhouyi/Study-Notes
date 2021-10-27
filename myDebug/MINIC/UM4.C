int f(int,int*);
int a,b,ab;
main()
{
  int c;
  c=f(0x10,&c);

}
int f(int x1,int* x2)
{
  ab=a+b+x1+ *x2;
  return ab;
}