assume cs:code
code segment
	mov ax,cs
	mov ds,ax
	mov ax,0020h
	mov es,ax
	
	mov cx,17h
	mov bx,0h
	
s:	mov dl,[bx]
	mov es:[bx],dl
	inc bx
	loop s
	
	mov ax,4c00h
	int 21h
code ends
end