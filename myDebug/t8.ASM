;实验10：1.显示字符串
;名称：show_str
;功能：在指定的位置，用指定的颜色，显示一个用 0 结束的字符串
;参数：(dh)=行号（取值范围0~24），(dl)=列号（取值范围0~79），(cl)=颜色，ds:si指向字符串的首地址

assume cs:code

data segment
	db 'I Love You China!',0
data ends

stack segment
	dw 8 dup(0)
stack ends

code segment
start:		
	mov ax,stack
	mov ss,ax
	mov sp,16
	mov dh,12
	mov dl,37
	mov cl,2
	mov ax,data
	mov ds,ax
	mov si,0
	call show_str
	
	mov ax,4c00h
	int 21h
			
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
	jcxz show_str_ok				;当前字符为 0 时跳出循环
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
			
			
			
			
			