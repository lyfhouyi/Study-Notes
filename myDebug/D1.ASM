;课程设计1：将源数据以结构化形式显示在屏幕上


assume cs:code,ss:stack

data segment
	db '1975','1976','1977','1978','1979','1980','1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995'
	;以上是21年的21个字符串
	
	dd 16,22,382,1356,2390,8000,16000,24486,50065,97479,140417,197514,345980,590827,803530,1183000,1843000,2759000,3753000,4649000,5937000
	;以上是表示21年公司总收入的21个dword型数据
	
	dw 3,7,9,13,28,38,130,220,476,778,1001,1442,2258,2793,4037,5635,8226,11542,14430,15257,17800
	;以上是21年公司雇员的人数的21个word型数据
data ends

table segment
	db 21 dup('year summ ne ?? ')
table ends

stack segment
	dw 32 dup(0)
stack ends

row segment
	db 64 dup(20h)
row ends

code segment
start:
	mov ax,stack
	mov ss,ax
	mov sp,64					;初始化栈顶指针
	
	mov ax,data
	mov es,ax					;设置源数据 段地址:(es)
	
	mov ax,table
	mov ds,ax					;设置结构型数据数组 段地址:(ds)
	
	call store					;将源数据结构化存储
	
	mov ax,row
	mov es,ax					;设置临时数据行 段地址:(es)
	mov cx,21
	mov bx,140h

s0:	;外层循环：遍历各行，(bx)控制结构型数据 数组 偏移地址，(di)控制结构型数据 元素 偏移地址，(si)控制临时数据行  偏移地址
	push cx
	
	
	mov cx,32
	mov si,0
s11:;内层2循环：清空临时数据行
	mov es:[si],2020h
	add si,2
	loop s11
	
	mov cx,2
	mov di,0
s12:;内层1循环：遍历“年份”字段
	mov ax,ds:[bx][di]
	mov es:[di+1],ax
	add di,2	
	loop s12
	

	
	mov di,5h
	mov ax,ds:[bx][di]
	mov dx,ds:[bx][di+2]
	mov si,11
	push ds
	mov cx,es
	mov ds,cx
	call dtoc_pro
	pop ds						;将 “收入” 转换成ASCII码
	
	mov di,0ah
	mov ax,ds:[bx][di]
	mov dx,0
	mov si,21
	push ds
	mov cx,es
	mov ds,cx
	call dtoc_pro
	pop ds						;将 “雇员数” 转换成ASCII码
	
	mov di,0dh
	mov ax,ds:[bx][di]
	mov dx,0
	mov si,31
	push ds
	mov cx,es
	mov ds,cx
	call dtoc_pro
	pop ds						;将 “人均收入” 转换成ASCII码
	
	push ds
	mov cx,es
	mov ds,cx
	mov si,0
	mov word ptr ds:[36],0		;设置行尾为 0
	mov bp,sp
	mov dh,[bp+2]
	mov dl,0
	mov cl,7h
	call show_str
	pop ds						;将临时数据行显示在屏幕上	

	
	sub bx,10h
	pop cx
	loop s0
	
	mov ax,4c00h
	int 21h

;以下为调用的子程序源代码

;名称：store
;功能：将源数据结构化存储
;参数：(es)=数据源段地址，ds:si结构型数据数组的首地址
store:
	push ax
	push bx
	push cx
	push dx
	push si
	push di
	
	
	mov bx,0h					;用bx定位每个结构型数据（数据项）
	mov si,0h					
	mov di,0h					;用si、di定位数据项中的每个元素
	mov cx,21					;循环21次遍历数据项
store_s:
	mov dx,es:168[di]
	mov [bx].0ah,dx				;存储人数
	
	mov dx,es:0[si]	
	mov [bx].0[0],dx			;存储年份的低字数据	
	mov ax,es:84[si]	
	mov [bx].5[0],ax			;存储收入的低字数据
	add si,2
	
	mov dx,es:0[si]	
	mov [bx].0[2],dx			;存储年份的高字数据	
	mov dx,es:84[si]	
	mov [bx].5[2],dx			;存储收入的高字数据
	add si,2
	
	div word ptr es:168[di]		;计算人均收入
	mov [bx].0dh,ax				;存储人均收入
	add di,2	
	add bx,10h
	loop store_s
	
	pop di
	pop si
	pop dx
	pop cx
	pop bx
	pop ax
	ret


;名称：dtoc_pro
;功能：将 dword 型数据转变为表示十进制数的字符串，字符串以 0 为结尾符
;参数：(ax)=dword 型数据的低16位，(dx)=dword 型数据的高16位，ds:si指向字符串的首地址
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
	


;名称：show_str
;功能：在指定的位置，用指定的颜色，显示一个用 0 结束的字符串
;参数：(dh)=行号（取值范围0~24），(dl)=列号（取值范围0~79），(cl)=颜色，ds:si指向字符串的首地址
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



;名称：divdw
;功能：进行不会产生溢出的除法运算，被除数为 dword 型，除数为 word 型，结果为 dword 型
;参数：(ax)=dword型数据的低16位，(dx)=dword型数据的高16位，(cx)=除数
;返回：(ax)=结果的低16位，(dx)=结果的高16位，(cx)=余数
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
		
		