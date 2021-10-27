;实验16：安装新的int7ch中断例程，为显示输出提供功能子程序
assume cs:code
stack segment
	dw 16 dup(0)
stack ends
code segment
start:
	mov ax,stack
	mov ss,ax
	mov sp,32
	mov ax,0
	mov es,ax
	mov di,200h
	mov ax,code
	mov ds,ax
	mov si,offset int7ch
	mov cx,offset int7chEnd-offset int7ch
	cld
	rep movsb
	
	mov word ptr es:[4*7ch],200h
	mov word ptr es:[4*7ch+2],0
	
	mov ah,3
	mov al,6
	int 7ch	
	
	mov ax,4c00h
	int 21h
int7ch:
	jmp short int7chBegin
	table dw offset sub1-offset int7ch+200h,offset sub2-offset int7ch+200h,offset sub3-offset int7ch+200h,offset sub4-offset int7ch+200h
int7chBegin:
	push bx
	cmp ah,3
	ja int7chFinish
	mov bl,ah
	mov bh,0
	add bx,bx
	mov si,offset start-offset int7ch+200h
	call word ptr table[bx+si]
int7chFinish:	
	pop bx
	iret
sub1:
	push bx
	push cx
	push ds
	mov cx,0b800h
	mov ds,cx
	mov cx,2000
	mov bx,0
sub1_s:
	mov byte ptr [bx],' '
	add bx,2
	loop sub1_s
	pop ds
	pop cx
	pop bx
	ret
	
sub2:
	push bx
	push cx
	push ds
	mov cx,0b800h
	mov ds,cx
	mov cx,2000
	mov bx,1
sub2_s:
	and byte ptr [bx],11111000b
	or [bx],al
	add bx,2
	loop sub2_s
	pop ds
	pop cx
	pop bx
	ret

sub3:
	push bx
	push cx
	push ds
	mov cx,0b800h
	mov ds,cx
	mov cl,4
	shl al,cl
	mov cx,2000
	mov bx,1
sub3_s:
	and byte ptr [bx],10001111b
	or [bx],al
	add bx,2
	loop sub3_s
	pop ds
	pop cx
	pop bx
	ret

sub4:
	push cx
	push ds
	push es
	push di
	push si
	mov cx,0b800h
	mov ds,cx
	mov es,cx
	mov si,160
	mov di,0
	mov cx,24*160
	cld
	rep movsb
	mov cx,80
sub4_s:	
	mov byte ptr ds:[di],' '
	add di,2
	loop sub4_s
	pop si
	pop di
	pop es
	pop ds
	pop cx
	ret
		
int7chEnd:
	nop
code ends
end start 