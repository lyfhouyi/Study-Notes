;将 ffff:0~ffff:b 单元中的数据复制到 0:200~0:20b 单元中
assume cs:code
code segment
	mov ax,0ffffh
	mov ds,ax
	mov ax,0020h
	mov es,ax
	
	mov bx,0h
	mov cx,12
	
s:	mov al,ds:[bx]
	mov es:[bx],al
	inc bx
	loop s
	
	mov ax,4c00h
	int 21h
	
code ends
end