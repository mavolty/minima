precision highp float;
uniform sampler2D tMap;
varying vec2 vUv;

void main() {
    vec4 tex = texture2D(tMap, vUv);
    gl_FragColor = tex;
}