assume cs:code
; data segment
	; dw 0,0
; data ends
; stack segment
	; db 128 dup(0)
; stack ends
code segment
start:
	mov ax,0b800h
	mov es,ax
	mov bx,0
	
	mov al,8
	mov ch,0
	mov cl,1
	mov dl,0
	mov dh,0
	mov ah,2
	int 13h
	
	mov ax,4c00h
	int 21h
code ends
end start