;将每个单词改为大写字母
assume cs:code,ds:data,ss:stack
data segment
	db 'ibm             '
	db 'dec             '
	db 'dos             '
	db 'vax             '
	db 'hex             '
	db 'bin             '
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
	mov di,0
	mov cx,6
	
	s0:
		push cx
		mov cx,3
		mov bx,0
		s1:
			mov al,[di][bx]
			and al,0dfh
			mov [di][bx],al
			inc bx	
			loop s1
		
		pop cx
		add di,10h
		loop s0
		
	mov ax,4c00h
	int 21h
code ends
end start