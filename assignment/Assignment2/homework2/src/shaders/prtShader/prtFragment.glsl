// 在顶点着色器中计算颜色，插值后送入片元着色器 houyi 2022.6.21
#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vColor;

void main(void){
    gl_FragColor = vec4(vColor,1);
}