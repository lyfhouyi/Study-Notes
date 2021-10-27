;将每个单词的前4个字母改为大写字母
assume cs:code,ds:data,ss:stack
data segment
	db '1. file         '
	db '2. display      '
	db '3. search       '
	db '4. view         '
	db '5. options      '
	db '6. help         '
data ends

stack segment
	dw 0,0,0,0,0,0,0,0
stack ends

code segment
start:
	mov ax,data
	mov ds,ax
	mov ax,stack
	mov ss,ax
	mov sp,16
	mov di,0	;外层循环变量：控制行
	mov cx,6
	
	s0:
		push cx
		mov cx,4
		mov bx,0	;内层循环变量：控制列
		s1:
			mov al,[di][bx].3
			and al,0dfh
			mov [di][bx].3,al
			inc bx	
			loop s1
		
		pop cx
		add di,10h
		loop s0
		
	mov ax,4c00h
	int 21h
code ends
end start