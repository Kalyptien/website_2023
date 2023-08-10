import { Component, HostListener } from '@angular/core';
import { last } from 'rxjs';

import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

import { ActivatedRoute } from '@angular/router';

let scrollY = window.scrollY
window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
})

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.sass']
})
export class CVComponent {

  constructor(private route: ActivatedRoute) {}

  birthday = new Date('August 11, 2001 13:00:00');
  timeDiff = Math.abs(Date.now() - this.birthday.getTime());
  age = Math.floor((this.timeDiff / (1000 * 3600 * 24))/365.25)

  ngOnInit() {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

     //Renderer
      let renderer : THREE.WebGLRenderer | null  = new THREE.WebGLRenderer({
        canvas: document.getElementById('webgl') as HTMLCanvasElement,
        antialias: true,
        alpha: true
      })
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearAlpha(0)

      // Scene
      let scene: THREE.Scene | null = new THREE.Scene()

      // Base camera
      let camera: THREE.PerspectiveCamera | null = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
      camera.position.z = 6
      scene.add(camera)

      //Load background texture
      const loader = new THREE.TextureLoader();

      const MarbelTexture1 = loader.load('assets/img/marbre1.jpg')
      const MarbelTexture2 = loader.load('assets/img/marbre2.jpg')
      const MarbelTexture3 = loader.load('assets/img/marbre3.jpg')
      const MarbelTexture4 = loader.load('assets/img/marbre4.jpg')

      MarbelTexture4.encoding = THREE.sRGBEncoding
      MarbelTexture2.encoding = THREE.sRGBEncoding


      const marbel1 = new THREE.MeshBasicMaterial({ map: MarbelTexture1 })
      const marbel2 = new THREE.MeshBasicMaterial({ map: MarbelTexture2 })
      const marbel3 = new THREE.MeshBasicMaterial({ map: MarbelTexture3 })
      const marbel4 = new THREE.MeshBasicMaterial({ map: MarbelTexture4 })

      marbel1.side = THREE.DoubleSide
      marbel2.side = THREE.DoubleSide
      marbel3.side = THREE.DoubleSide
      marbel4.side = THREE.DoubleSide

      const objLoader = new OBJLoader()
      let sectionMeshes : Array<THREE.Mesh> = []

      objLoader.load(
        'assets/3D/cone.obj',
        (object) => {
          object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                sectionMeshes.push(child)
                child.material = marbel2;
              }
          } );
          object.position.y = 0
          object.position.x = - 5
          object.position.z = -3
          object.rotation.y = - Math.PI / 4
          scene?.add(object)
        }
    )

    objLoader.load(
      'assets/3D/deca.obj',
      (object) => {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              sectionMeshes.push(child)
              child.material = marbel4;
            }
        } );
        object.position.y = 2
        object.position.x = 5
        object.position.z = -2
        object.rotation.y = - Math.PI / 4
        scene?.add(object)
      }
  )

      objLoader.load(
          'assets/3D/pc.obj',
          (object) => {
            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                  sectionMeshes.push(child)
                  child.material = marbel3;
                  child.position.y = - 5
                  child.position.x = - 4
                  child.position.z = 1
                  child.rotation.y = - Math.PI / 4
                }
            } );
            scene?.add(object)
          }
      )

      objLoader.load(
        'assets/3D/bouture.obj',
        (object) => {
          object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                sectionMeshes.push(child)
                child.material = marbel1;
                child.position.y = - 13.5
                child.position.x = 3
                child.position.z = 2
                child.rotation.y = - Math.PI / 4
                child.rotation.z = Math.PI / 8
                child.rotation.x = Math.PI / 8
              }
          } );
          scene?.add(object)
        }
      )

      objLoader.load(
        'assets/3D/trompette.obj',
        (object) => {
          object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                sectionMeshes.push(child)
                child.material = marbel3;
                child.position.y = - 23.5
                child.position.x = - 2.5
                child.position.z = 2
                child.rotation.y = - Math.PI / 4
                child.rotation.z = - Math.PI / 8
                child.rotation.x = - Math.PI / 8
              }
          } );
          scene?.add(object)
        }
      )

      objLoader.load(
        'assets/3D/morille.obj',
        (object) => {
          object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                sectionMeshes.push(child)
                child.material = marbel1;
                child.position.y = - 22
                child.position.x = 2.5
                child.position.z = 2
                child.rotation.y = - Math.PI / 4
                child.rotation.z = Math.PI / 8
                child.rotation.x = Math.PI / 8
              }
          } );
          scene?.add(object)
        }
      )

      window.addEventListener('resize', onWindowResize, false)
      function onWindowResize() {

        sizes.width = window.innerWidth,
        sizes.height = window.innerHeight

        if(camera != null){
          camera.aspect = sizes.width / sizes.height
          camera.updateProjectionMatrix()
        }

        if(renderer != null && scene != null && camera != null){
          renderer.setSize(sizes.width, sizes.height)
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          renderer.render(scene, camera)
        }
      } 

      //Animation
      const clock = new THREE.Clock()
      const tick = () =>
      {
          const elapsedTime = clock.getElapsedTime()

          for(const mesh of sectionMeshes)
          {
              mesh.rotation.x = elapsedTime * 0.08
              mesh.rotation.y = elapsedTime * 0.05
          }

          // Animate camera
          if(camera != null)
          camera.position.y = - scrollY / sizes.height * 4.5

          // Render
          if(renderer != null && scene != null && camera != null)
          renderer.render(scene, camera)

          // Call tick again on the next frame

          if(window.location.href.includes("curriculum") ){
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