import { default as seagulls } from '../../seagulls-main/seagulls.js'

const shader = `${seagulls.constants.vertex}

@group(0) @binding(0) var <uniform> frame : f32;
@group(0) @binding(1) var <uniform> resolution : vec2f;

@fragment
fn fs( @builtin(position) pos : vec4f ) -> @location(0) vec4f {
  let uv = pos.xy / resolution;
  let time = frame / 60.;
  return vec4f( uv.x, uv.y, time % 1., 1. );
}`

const sg         = await seagulls.init()
const resolution = [ window.innerWidth, window.innerHeight ]
let frame = 0

sg
  .uniforms({ frame, resolution })
  .onframe( ()=> sg.uniforms.frame = frame++ ) 
  .render( shader )
  .run()