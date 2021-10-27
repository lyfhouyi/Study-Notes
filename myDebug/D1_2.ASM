;课程设计1：

;2.数据结构化存储
;名称：store
;功能：将源数据结构化存储
;参数：(es)=数据源段地址，ds:si结构型数据数组的首地址

assume cs:code

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

code segment
start:
	mov ax,table
	mov ds,ax					;设置结构化数据的段地址
	mov ax,data				
	mov es,ax					;设置数据源的段地址
	call store
	
	mov ax,4c00h
	int 21h
	
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
		
		
code ends
end start