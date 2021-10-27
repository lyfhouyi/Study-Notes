;将 a段、b段中的数据依次相加，结果保存在 c段中
assume cs:code

a segment
	db 1,2,3,4,5,6,7,8
a ends

b segment
	db 10,20,30,40,50,60,70,80
b ends

c segment
	db 0,0,0,0,0,0,0,0
c ends

code segment
start:
	mov ax,c
	mov ds,ax
	
	mov bx,0
	mov cx,8
	
	
s:	mov ax,a
	mov es,ax
	mov dl,es:[bx]
	mov ax,b
	mov es,ax
	add dl,es:[bx]
	mov ds:[bx],dl
	inc bx
	loop s
	
	mov ax,4c00h
	int 21h
code ends
end start