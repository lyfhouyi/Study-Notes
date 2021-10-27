;实验9：屏幕居中显示字符串,以 NUL 作为字符串末尾
assume cs:code

data segment
	db 31h,32h,36h,36h,0
data ends

stack segment
	db 256 dup(0)
stack ends

code segment
	start:
		mov ax,stack
		mov ss,ax
		mov sp,256					;初始化栈顶
		mov ax,data
		mov es,ax					;初始化数据源段地址
		mov ax,0b800h				
		mov ds,ax					;设置显示缓冲区段地址
		mov bx,0	

	s:	
		mov cl,es:[bx]
		mov ch,0					;读取字符
		jcxz eos					;若字符为 NUL 则结束
		push cx						;字符压栈
		inc bx
		jmp short s
		
	eos:
		mov cx,bx					;有效字符个数作为循环变量
		add bx,78					;设置居中的字符串尾字符位置
		and bx,0feh					;调整字符串尾字符位置为偶数
	t:
		pop ax						;获取当前尾字符
		
		mov ah,0cah	
		mov 640h[bx],ax
		mov ah,71h	
		mov 780h[bx],ax
		mov ah,2h					;设置字符属性	
		mov 8c0h[bx],ax				;显示当前字符
		
		sub bx,2
		loop t
		
		mov ax,4c00h
		int 21h
	
code ends
end start
