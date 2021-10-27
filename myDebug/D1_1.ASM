;课程设计1：

;1.数值显示_防除法溢出版
;名称：dtoc_pro
;功能：将 dword 型数据转变为表示十进制数的字符串，字符串以 0 为结尾符
;参数：(ax)=dword 型数据的低16位，(dx)=dword 型数据的高16位，ds:si指向字符串的首地址

assume cs:code

data segment
	db 16 dup(0)
data ends

stack segment
	dw 32 dup(0)
stack ends

code segment
start:
	mov ax,stack
	mov ss,ax
	mov sp,64
	
	mov ax,0de1fh
	mov dx,19h		;2 802 112 666D=A704 D89A H
	mov bx,data
	mov ds,bx
	mov si,0
	call dtoc_pro
	
	mov dh,8
	mov dl,3
	mov cl,2
	call show_str
	
	mov ax,4c00h
	int 21h

dtoc_pro:	
	push bx
	push cx
	push dx
	push bp
	push si
	
	mov bp,0
		
dtoc_pro_s:	
	mov cx,10			;“除10倒余”
	call divdw			;(DX)=商的高16位，(AX)=商的低16位，(CX)=余
	add cx,30H			;计算字符的ASCII码
	
	push cx
	inc bp				;将余数压栈，计数器加一
	
	mov cx,ax
	add cx,dx
	jcxz dtoc_pro_eos	;商为 0 时跳出循环
	jmp short dtoc_pro_s
	
dtoc_pro_eos:
	mov cx,bp
dtoc_pro_t:	
	pop ax				;取回当前首数字的ASCII码
	mov ds:[si],al		;将当前首数字的ASCII码送入目标地址
	inc si
	loop dtoc_pro_t
	
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
	
divdw:	
	push bp
	mov bp,sp

	push ax				;保存被除数的低16位:[bp-2]	
	mov ax,dx	
	mov dx,0	
	mov dx,0	
	div cx				;(AX)=int(H/N),(DX)=rem(H/N)
	push ax				;保存(AX)=int(H/N)，此即为最终结果的高16位:[bp-4]
	push dx				;保存(DX)=rem(H/N):[bp-8]
	mov ax,[bp-2]		;提取除数的低16位
	div cx				;(AX)的值为最终结果的低16位，(DX)的值为最终结果的余数
		
	mov cx,dx	
	mov dx,[bp-4]		;将返回值赋给相应的寄存器
		
	mov sp,bp	
	pop bp				;恢复栈状态
	ret
	
	
code ends
end start	
		
		