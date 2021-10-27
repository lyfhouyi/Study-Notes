;实验11：字符串小写字母转大写
;名称：letterc
;功能：将以 0 结尾的字符串中的小写字母转变成大写字母
;参数：ds:si指向字符串首地址

assume cs:code

data segment
	db "Beginner's All-purpose Symbolic Instruction Code.",0
data ends

code segment
begin:
	mov ax,data
	mov ds,ax
	mov si,0
	
	call letterc
		
	mov ax,4c00h
	int 21h

letterc:	
	push ax
	push si
letterc_s:
	mov al,ds:[si]
	cmp al,0
	je letterc_ok
	cmp al,61h
	jb letterc_next
	cmp al,7ah
	ja letterc_next
	sub al,20h
	mov ds:[si],al
letterc_next:
	inc si
	jmp letterc_s
	
letterc_ok:	pop si
	pop ax
	ret
		
code ends
end begin	
		
		