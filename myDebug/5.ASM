;计算 ffff:0~ffff:b 单元中的数据和，储存在dx中
assume cs:code
code segment
	mov ax,0ffffh
	mov ds,ax
	mov ah,0h
	
	mov dx,0h
	mov cx,12
	mov bx,0h
	
s:	mov al,[bx]
	add dx,ax
	inc bx
	loop s
	
	
	mov ax,4c00h
	int 21h
	
code ends
end