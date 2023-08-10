import { Component } from '@angular/core';

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import galaxyVertexShader from './vertex.glsl'
import galaxyFragmentShader from './fragment.glsl'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent {

  ngOnInit() {
    // Scene
    let scene: THREE.Scene | null = new THREE.Scene()

    /**
     * Galaxy
     */
    const parameters = {
      count: 100000,
      size: 0.005,
      radius: 5,
      branches: 3,
      spin: 1,
      randomness: 0.2,
      randomnessPower: 3,
      insideColor: '#ff6030',
      outsideColor: '#1b3984'
    }

    let geometry = null
    let material: THREE.ShaderMaterial | null | undefined = null
    let points = null

    if(geometry !== null)
    (<any>geometry).dispose()

    if(material !== null)
    (<any>material).dispose()

    if(points !== null)
        scene.remove(points)

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count * 3)
    const randomness = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const scales = new Float32Array(parameters.count * 1)

    const insideColor = new THREE.Color(parameters.insideColor)
    const outsideColor = new THREE.Color(parameters.outsideColor)

    for(let i = 0; i < parameters.count; i++)
    {
        const i3 = i * 3

        // Position
        const radius = Math.random() * parameters.radius

        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius

        positions[i3    ] = Math.cos(branchAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ

        randomness[i3    ] = randomX
        randomness[i3 + 1] = randomY
        randomness[i3 + 2] = randomZ

        // Color
        const mixedColor = insideColor.clone()
        mixedColor.lerp(outsideColor, radius / parameters.radius)

        colors[i3    ] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b

        // Scale
        scales[i] = Math.random()
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

    /**
     * Sizes
     */
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        if(camera != null){
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
        }

        // Update renderer
        if(renderer != null){
          renderer.setSize(sizes.width, sizes.height)
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }
    })

    /**
     * Camera
     */
    // Base camera
    let camera: THREE.PerspectiveCamera | null = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 3
    camera.position.y = 3
    camera.position.z = 3
    camera.lookAt(0,0,0)
    scene.add(camera)

    /**
     * Renderer
     */
    let renderer : THREE.WebGLRenderer | null = new THREE.WebGLRenderer({
      canvas: document.getElementById('WELCOMEwebgl') as HTMLCanvasElement,
      antialias: true
      //alpha: true
    })
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

     /**
     * Material
     */
     material = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms:
        {
          uTime: { value: 0 },
          uSize: { value: 30 * renderer.getPixelRatio() }
        },
        vertexShader: `
          uniform float uTime;
          uniform float uSize;
          
          attribute vec3 aRandomness;
          attribute float aScale;
          
          varying vec3 vColor;

          void main()
          {
              /**
               * Position
               */
              vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
              // Rotate
              float angle = atan(modelPosition.x, modelPosition.z);
              float distanceToCenter = length(modelPosition.xz);
              float angleOffset = (1.0 / distanceToCenter) * uTime;
              angle += angleOffset;
              modelPosition.x = cos(angle * 0.5) * distanceToCenter;
              modelPosition.z = sin(angle) * distanceToCenter;

              // Randomness
              modelPosition.xyz += aRandomness;

              vec4 viewPosition = viewMatrix * modelPosition;
              vec4 projectedPosition = projectionMatrix * viewPosition;
              gl_Position = projectedPosition;

              /**
               * Size
               */
              gl_PointSize = uSize * aScale;
              gl_PointSize *= (1.0 / - viewPosition.z);

              vColor = color;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;

          void main()
          {
            // Light point
            float strength = distance(gl_PointCoord, vec2(0.5));
            strength = 1.0 - strength;
            strength = pow(strength, 10.0);

            // Final color
            vec3 color = mix(vec3(0.0), vColor, strength);
            gl_FragColor = vec4(color, 1.0);
          }
        `
  })

    /**
     * Points
     */
    points = new THREE.Points(geometry, material)
    scene.add(points)

    /**
     * Animate
     */
    const clock = new THREE.Clock()

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()

        // Update material
        if(material !== null && material !== undefined)
        material.uniforms['uTime'].value = elapsedTime

        if(camera != null){
          camera.position.x = - Math.tan(elapsedTime * 0.05)
          camera.position.z =  Math.cos(elapsedTime * 0.1)
          camera.lookAt(0,0,0)
        }

        // Render
        if(scene != null && camera != null && renderer != null)
        renderer.render(scene, camera)

        // Call tick again on the next frame
        if(!window.location.href.includes("curriculum") && !window.location.href.includes("portfolio") ){
          window.requestAnimationFrame(tick)
        }
        else{
          scene = null
          renderer = null
          camera = null
        }
    }

    tick()
  }

}
