;实验10：3.数值显示
;名称：dtoc
;功能：将 word 型数据转变为表示十进制数的字符串，字符串以 0 为结尾符
;参数：(ax)=word 型数据，ds:si指向字符串的首地址

assume cs:code

data segment
	db 10 dup(0)
data ends

stack segment
	dw 16 dup(0)
stack ends

code segment
start:
	mov ax,stack
	mov ss,ax
	mov sp,32
	
	mov ax,12666
	mov bx,data
	mov ds,bx
	mov si,0
	call dtoc
	
	mov dh,8
	mov dl,3
	mov cl,2
	call show_str
	
	mov ax,4c00h
	int 21h

dtoc:	
	push bx
	push cx
	push dx
	push bp
	push si
	
	mov bx,10
	mov bp,0
		
dotoc_s:	
	mov dx,0
	div bx				;(AX)=商，(DX)=余
	mov cx,ax
	add dx,30H			;计算字符的ASCII码
	
	push dx
	inc bp				;将余数压栈，计数器加一
	jcxz dotoc_eos		;商为 0 时跳出循环
	jmp short dotoc_s
dotoc_eos:
	mov cx,bp
dotoc_t:	
	pop ax				;取回当前首数字的ASCII码
	mov ds:[si],al		;将当前首数字的ASCII码送入目标地址
	inc si
	loop dotoc_t
	
	pop si
	pop bp
	pop dx
	pop cx
	pop bx
	ret
		
show_str:
	push ax
	push bx
	push cx
	push dx
	push si
	push di
	push es
	push bp
	
	mov bl,cl			;记录颜色
	mov ax,0b800h				
	mov es,ax			;设置显示缓冲区 段地址
	
	mov al,dh
	mov ah,0a0h
	mul ah
	mov bp,ax			;计算行 偏移地址
	
	mov al,dl
	mov ah,2
	mul ah
	mov di,ax			;计算列 偏移地址
				
show_str_s:	
	mov cl,ds:[si]
	mov ch,0			;读取当前字符
	jcxz show_str_ok	;当前字符为 0 时跳出循环
	mov ch,bl			;设置字符属性（颜色）
	
	mov es:[bp][di],cx	;显示字符
	add di,2
	inc si
	jmp show_str_s
				
show_str_ok:
	pop bp
	pop	es
	pop di
	pop si
	pop dx
	pop cx
	pop bx
	pop ax
	ret
code ends
end start	
		
		