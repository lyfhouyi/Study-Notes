// 在片元着色器中计算颜色 houyi 2022.6.20
attribute vec3 aVertexPosition;
attribute mat3 aPrecomputeLT;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

varying highp mat3 vPrecomputeLT;

void main(void){
  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix *
                vec4(aVertexPosition, 1.0);
  vPrecomputeLT = aPrecomputeLT;
}