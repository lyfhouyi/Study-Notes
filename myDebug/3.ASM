assume cs:codeseg

codeseg segment
	
	mov ax,0ffffh
	mov ds,ax
	mov bx,6
	mov al,cs:[6]
	mov ah,0
	mov dx,0
	mov cx,123
s:	add dx,ax
	add dx,3
	add dx,6
	loop s
		
	mov ax,4c00h
	int 21h
	
codeseg ends

end