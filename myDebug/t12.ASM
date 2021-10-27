;实验12：以 “年/月/日 时:分:秒” 的格式，显示当前的日期、时间

assume cs:code

row segment
	dw 16 dup(0)
row ends

code segment
begin:
	mov ax,row
	mov ds,ax
	mov si,0				;设置临死数据行指针
	
	mov al,9
	out 70h,al
	in al,71h
	
	mov ah,al
	mov cl,4
	shr al,cl
	and ah,00001111b
	add ah,30h
	add al,30h
	
	mov [si],ax
	add si,2				;临时存储 “年”	
	mov byte ptr [si],'/'
	inc si
	
	mov al,8
	out 70h,al
	in al,71h
	
	mov ah,al
	mov cl,4
	shr al,cl
	and ah,00001111b
	add ah,30h
	add al,30h
	
	mov [si],ax
	add si,2				;临时存储 “月”	
	mov byte ptr [si],'/'
	inc si
	
	mov al,7
	out 70h,al
	in al,71h
	
	mov ah,al
	mov cl,4
	shr al,cl
	and ah,00001111b
	add ah,30h
	add al,30h
	
	mov [si],ax
	add si,2				;临时存储 “日”	
	mov byte ptr [si],' '	
	inc si
	
	mov al,4
	out 70h,al
	in al,71h
	
	mov ah,al
	mov cl,4
	shr al,cl
	and ah,00001111b
	add ah,30h
	add al,30h
	
	mov [si],ax
	add si,2				;临时存储 “时”	
	mov byte ptr [si],':'
	inc si
	
	mov al,2
	out 70h,al
	in al,71h
	
	mov ah,al
	mov cl,4
	shr al,cl
	and ah,00001111b
	add ah,30h
	add al,30h
	
	mov [si],ax
	add si,2				;临时存储 “分”	
	mov byte ptr [si],':'
	inc si

	mov al,0
	out 70h,al
	in al,71h
	
	mov ah,al
	mov cl,4
	shr al,cl
	and ah,00001111b
	add ah,30h
	add al,30h
	
	mov [si],ax
	add si,2				;临时存储 “秒”	
	mov byte ptr [si],'$'

	mov ah,2
	mov bh,0
	mov dh,12
	mov dl,30
	int 10h					;置光标
	
	mov dx,0
	mov ah,9
	int 21h					;在光标位置显示字符串
	
	mov ax,4c00h
	int 21h
code ends
end begin	
		
		