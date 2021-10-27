assume cs:code
data segment
	db 'welcome to masm!'
	db '................'
data ends
code segment
start:
	mov ax,data
	mov ds,ax
	
	mov di,0
	mov cx,8
	s:
		mov ax,[bx+di]
		mov 16[di],ax
		inc di
		inc di
		loop s
	mov ax,4c00h
	int 21h
code ends
end start