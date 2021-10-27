;课程设计2_3：时钟程序
;功能：动态显示当前日期、时间；按下F1键后，改变显示颜色；按下Esc键后，退出程序
assume cs:code

row segment
	db 36 dup(7h)
row ends
data segment
	dw 0,0
data ends
stack segment
	dw 32 dup(0)
stack ends
code segment
begin:
	mov ax,stack
	mov ss,ax
	mov sp,64

	mov ax,data
	mov ds,ax
	mov ax,0
	mov es,ax
	
	mov ax,es:[9*4]
	mov ds:[0],ax
	mov ax,es:[9*4+2]
	mov ds:[2],ax				;存储原int9中断例程入口
		
	cli
	mov word ptr es:[9*4],offset int9
	mov es:[9*4+2],cs
	sti							;设置新的int9中断例程入口
	
	call show

; quit:
	; mov ax,data
	; mov ds,ax
	; mov ax,0
	; mov es,ax
	cli
	mov ax,ds:[0]
	mov es:[9*4],ax
	mov ax,ds:[2]
	mov es:[9*4+2],ax
	sti							;恢复原int9中断例程入口

	mov ax,4c00h
	int 21h

int9:
	push ax
	push bx
	push cx
	push ds
	push es

	mov ax,data
	mov ds,ax
	
	in al,60h
	
	pushf
	pushf
	pop bx
	and bh,11111100b
	push bx
	popf
	call dword ptr ds:[0]		;调用原int9中断例程
	
	cmp al,1
	je quit
	cmp al,3bh
	jne int9Ret
	mov ax,row
	mov es,ax
	mov cx,18
	mov bx,1
int9_s:
	inc byte ptr es:[bx]
	add bx,2
	loop int9_s	
	
int9Ret:
	pop es
	pop ds
	pop cx
	pop bx
	pop ax
	iret

quit:
	pop es
	pop ds
	pop cx
	pop bx
	pop ax
	add sp,4
	popf
	jmp near ptr show_ret
	
show:
	push ax
	push cx
	push ds
	push es
	push di
	push si
	
	mov ax,row
	mov ds,ax
	mov ax,0b800h
	mov es,ax
show_s:	
	mov al,9
	out 70h,al
	in al,71h
	
	mov ah,al
	mov cl,4
	shr ah,cl
	and al,00001111b
	add ah,30h
	add al,30h
	
	mov ds:[0],ah
	mov ds:[2],al				;临时存储 “年”	
	mov byte ptr ds:[4],'/'
	
	mov al,8
	out 70h,al
	in al,71h
	
	mov ah,al
	mov cl,4
	shr ah,cl
	and al,00001111b
	add ah,30h
	add al,30h
	
	mov ds:[6],ah
	mov ds:[8],al				;临时存储 “月”	
	mov byte ptr ds:[10],'/'
	
	mov al,7
	out 70h,al
	in al,71h
	
	mov ah,al
	mov cl,4
	shr ah,cl
	and al,00001111b
	add ah,30h
	add al,30h
	
	mov ds:[12],ah
	mov ds:[14],al				;临时存储 “日”	
	
	mov byte ptr ds:[16],' '
	
	mov al,4
	out 70h,al
	in al,71h
	
	mov ah,al
	mov cl,4
	shr ah,cl
	and al,00001111b
	add ah,30h
	add al,30h
	
	mov ds:[18],ah
	mov ds:[20],al				;临时存储 “时”	
	mov byte ptr ds:[22],':'
	
	mov al,2
	out 70h,al
	in al,71h
	
	mov ah,al
	mov cl,4
	shr ah,cl
	and al,00001111b
	add ah,30h
	add al,30h
	
	mov ds:[24],ah
	mov ds:[26],al				;临时存储 “分”	
	mov byte ptr ds:[28],':'

	mov al,0
	out 70h,al
	in al,71h
	
	mov ah,al
	mov cl,4
	shr ah,cl
	and al,00001111b
	add ah,30h
	add al,30h
	
	mov ds:[30],ah
	mov ds:[32],al				;临时存储 “秒”	

	mov si,0					;设置临时数据行指针（源）
	mov di,12*160+36*2			;设置显存指针（终）
	mov cx,34
	cld
	rep movsb
	
	jmp near ptr show_s
show_ret:
	pop si
	pop di
	pop es
	pop ds
	pop cx
	pop ax
	ret

code ends
end begin	