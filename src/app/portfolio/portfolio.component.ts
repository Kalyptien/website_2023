import { Component } from '@angular/core';

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import HeaderScene from './ThreeJS/HeaderScene';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.sass']
})
export class PortfolioComponent {
  /*ngOnInit() {
    //Sizes

      const width = window.innerWidth;
      const height = window.innerHeight;

     //Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('webgl') as HTMLCanvasElement,
        antialias: true
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Base camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)

      // Scene
      const scene = new HeaderScene
      scene.initialize()

      //Load background texture
      const loader = new THREE.TextureLoader();
      loader.load('assets/img/paper.png' , function(texture)
            {
             scene.background = texture;  
            });

      camera.position.x = 0
      camera.position.y = 0
      camera.position.z = 5
      scene.add(camera)

      //Animation
      const clock = new THREE.Clock()
      const tick = () =>
      {
          const elapsedTime = clock.getElapsedTime()

          scene.update()

          // Render
          renderer.render(scene, camera)

          // Call tick again on the next frame
          window.requestAnimationFrame(tick)
      }

      tick()
  }*/
}
