/**
 * The water, alive: the painted-out photograph drawn through one fragment
 * shader so the surface ripples, glints, and the shafts under it shimmer.
 *
 *   ripple   fbm displacement, strong at the surface, a slow sway below it
 *   glints   bright caustic flecks riding the surface, a few percent
 *   shafts   a fan of bands around a source above the frame, modulating
 *            only the light already in the picture, so dark water stays dark
 *
 * The cursor nudges the fan's source a little. Returns null when WebGL is
 * unavailable; the <img> under the canvas stays as the still fallback.
 */
const VERT = `
attribute vec2 a;
varying vec2 v;
void main() { v = vec2(a.x * .5 + .5, .5 - a.y * .5); gl_Position = vec4(a, 0., 1.); }`;

/* NOTHING IN HERE GROWS WITH TIME. The first cut fed raw seconds into the
   noise (`uv + t * .09`) and hashed it with `fract(sin(x) * 43758.5)`. Where a
   GPU runs fragments at mediump (16-bit floats) that product overflows once
   the coordinates get large, the hash returns NaN and the water paints black —
   lowest rows first, since their coordinates are largest, so a black curtain
   climbed the hero over a minute or two. Now every time-driven term arrives
   bounded: the phases are wrapped to 2π in JS (double precision), the noise
   drifts by offsets that travel round circles, and the hash uses no `sin`. */
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D u_tex;
uniform vec4 u_ph;   // phases, each in [0, 2pi): shafts a, b, c; deep sway
uniform vec4 u_o;    // ripple noise offsets: xy and zw, each on a circle
uniform vec2 u_og;   // glint noise offset, on a circle
uniform vec2 u_m;
varying vec2 v;
float h(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * .1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float n(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1., 0.)), f.x), mix(h(i + vec2(0., 1.)), h(i + vec2(1., 1.)), f.x), f.y);
}
float fbm(vec2 p) { float s = 0., a = .5; for (int i = 0; i < 4; i++) { s += a * n(p); p *= 2.03; a *= .5; } return s; }
void main() {
  vec2 uv = v;
  float surf = 1. - smoothstep(.04, .5, uv.y);

  // ripple: the surface rolls, the deep water only sways
  vec2 q = vec2(fbm(uv * vec2(5., 13.) + u_o.xy),
                fbm(uv * vec2(5., 13.) + u_o.zw + 5.2));
  vec2 d = (q - .5) * vec2(.012, .007) * surf;
  d.x += sin(uv.y * 9. + u_ph.w) * .0011 * (1. - surf);
  vec3 col = texture2D(u_tex, uv + d).rgb;

  // glints on the surface
  float c = fbm(uv * vec2(14., 32.) + q * 3. + u_og);
  col *= 1. + surf * (smoothstep(.56, .86, c) * .28 - .04);

  // shafts: bands fanning from where the photograph's own shafts meet —
  // measured off the picture (structure tensor over the lit water): just
  // above the surface, right of centre, so the left-hand shafts fall at
  // ~33 degrees, down and to the left, as the real ones do
  vec2 r = uv - vec2(.74 + u_m.x * .02, -.12);
  r.x *= 1.661;
  float ang = atan(r.x, r.y), len = length(r);
  float sh = .5 + .5 * sin(ang * 64. + u_ph.x + sin(ang * 11. - u_ph.y) * 2.);
  sh *= .55 + .45 * sin(ang * 29. - u_ph.z);
  float band = smoothstep(.22, .4, len) * (1. - smoothstep(.85, 1.5, len));
  float lum = dot(col, vec3(.299, .587, .114));
  col += col * sh * band * smoothstep(.07, .32, lum) * .34;
  col *= 1. - band * .07 * (1. - sh);

  gl_FragColor = vec4(clamp(col, 0., 1.), 1.);
}`;

const TAU = Math.PI * 2;

export type Water = { draw: (t: number, mx: number, my: number) => void; size: () => void; dispose: () => void };

export function makeWater(canvas: HTMLCanvasElement, src: string, onReady: () => void): Water | null {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false });
  if (!gl) return null;

  const sh = (type: number, code: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, code); gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uPh = gl.getUniformLocation(prog, 'u_ph'), uO = gl.getUniformLocation(prog, 'u_o');
  const uOg = gl.getUniformLocation(prog, 'u_og'), uM = gl.getUniformLocation(prog, 'u_m');

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  for (const p of [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T]) gl.texParameteri(gl.TEXTURE_2D, p, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  let ready = false, dead = false;
  const img = new Image();
  img.decoding = 'async';
  img.onload = () => {
    if (dead) return;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    ready = true;
  };
  img.src = src;

  const size = () => {
    // the photograph is soft; a little under device pixels is plenty
    const k = Math.min(devicePixelRatio || 1, 1.5);
    const w = Math.min(2600, Math.round(canvas.clientWidth * k));
    const h = Math.round(w * canvas.clientHeight / Math.max(1, canvas.clientWidth));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  size();

  let shown = false;
  return {
    size,
    draw(t, mx, my) {
      if (!ready || dead) return;
      // phases at the rates the first cut used, wrapped here in doubles
      const ph = (k: number) => (t * k) % TAU;
      gl.uniform4f(uPh, ph(.55), ph(.27), ph(.4), ph(.35));
      // drift on circles: radius 6 at ~.1 units/s, so the water wanders as
      // before but its coordinates stay within a few units forever
      const a1 = ph(.016), a2 = ph(.013) + 1.3, a3 = ph(.012) + 2.1;
      gl.uniform4f(uO, 6 * Math.cos(a1), 6 * Math.sin(a1), 6 * Math.cos(-a2), 6 * Math.sin(-a2));
      gl.uniform2f(uOg, 10 * Math.cos(a3), 10 * Math.sin(a3));
      gl.uniform2f(uM, mx, my);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!shown) { shown = true; onReady(); }
    },
    dispose() {
      dead = true;
      gl.deleteTexture(tex); gl.deleteBuffer(buf); gl.deleteProgram(prog);
      gl.deleteShader(vs); gl.deleteShader(fs);
    },
  };
}
