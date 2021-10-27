;编写、安装中断7ch的中断例程
;功能：求一word型数据的平方
;参数：(ax)=要计算的数据
;返回值：dx、ax中存放结果的高16位和低16位

assume cs:code

code segment
start:
	mov ax,0
	mov es,ax
	mov di,200h
	
	mov ax,cs
	mov ds,ax
	mov si,offset d7c
	
	mov cx,offset d7cend-offset d7c
	cld
	rep movsb							;安装d0
	
	mov word ptr es:[7ch*4+0],200h
	mov word ptr es:[7ch*4+2],0				;设置中断向量表
	
	mov ax,4c00h
	int 21h
d7c:
	mul ax
	iret

d7cend:
	nop
	
code ends
end start