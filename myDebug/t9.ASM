;实验10：2.解决除法溢出的问题
;名称：divdw
;功能：进行不会产生溢出的除法运算，被除数为 dword 型，除数为 word 型，结果为 dword 型
;参数：(ax)=dword型数据的低16位，(dx)=dword型数据的高16位，(cx)=除数
;返回：(ax)=结果的低16位，(dx)=结果的高16位，(cx)=余数

assume cs:code

stack segment
	dw 8 dup(0)
stack ends

code segment
start:	mov ax,stack
		mov ss,ax
		mov sp,16
		mov ax,4240h 
		mov dx,000fh
		mov cx,0dh
		call divdw
		mov ax,4c00h
		int 21h
divdw:	push bp
		mov bp,sp

		push ax			;保存被除数的低16位:[bp-2]	
		mov ax,dx
		mov dx,0
		mov dx,0
		div cx			;(AX)=int(H/N),(DX)=rem(H/N)
		push ax			;保存(AX)=int(H/N)，此即为最终结果的高16位:[bp-4]
		push dx			;保存(DX)=rem(H/N):[bp-8]
		mov ax,[bp-2]	;提取除数的低16位
		div cx			;(AX)的值为最终结果的低16位，(DX)的值为最终结果的余数
		
		mov cx,dx
		mov dx,[bp-4]	;将返回值赋给相应的寄存器
		
		mov sp,bp
		pop bp			;恢复栈状态
		ret
		
code ends
end start
