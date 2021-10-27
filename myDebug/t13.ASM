;实验15：安装新的int9中断例程
assume cs:code,es:data
; stack segment
	; db 128 dup(0)
; stack ends
data segment
	a dw 1,2,3,4,5,6,7,8
	b dd 0	
data ends
code segment
start:
	mov ax,data
	mov es,ax

	mov si,0
	mov cx,8
s:
	mov ax,a[si]
	add a[16],ax
	adc a[18],0

	add si,2
	loop s
	
	mov ax,4c00h
	int 21h
code ends
end start