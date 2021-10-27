;将每个单词的首字母改为大写字母
assume cs:code,ds:data
data segment
	db '1. file         '
	db '2. edit         '
	db '3. search       '
	db '4. view         '
	db '5. options      '
	db '6. help         '
data ends

code segment
start:
	mov ax,data
	mov ds,ax
	mov bx,0
	mov cx,6
	
	s:
		mov al,[bx][3]
		and al,0dfh
		mov [bx][3],al
		add bx,10h
		loop s
		
	mov ax,4c00h
	int 21h
code ends
end start