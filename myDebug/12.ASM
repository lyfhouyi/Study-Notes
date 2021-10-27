;0号中断处理程序
assume cs:code

code segment
start:
	mov ax,0
	mov es,ax
	mov di,200h
	
	mov ax,cs
	mov ds,ax
	mov si,offset d0
	
	mov cx,offset d0end-offset d0
	cld
	rep movsb							;安装d0
	
	mov word ptr es:[0],200h
	mov word ptr es:[2],0				;设置中断向量表
	
	mov ax,1000h
	mov bh,1
	div bh
	
	mov ax,4c00h
	int 21h
d0:
	jmp short d0Start
	db "houyi!"
d0Start:
	mov ax,0b800h
	mov ds,ax
	mov si,12*160+80
	
	mov ax,cs
	mov es,ax
	mov di,202h
	
	mov cx,6
s:
	mov al,es:[di]
	mov [si],al
	inc di
	add si,2
	loop s
	
	mov ax,4c00h
	int 21h

d0end:
	nop
	
code ends
end start