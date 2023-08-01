import { Component, HostListener } from '@angular/core';
import { last } from 'rxjs';

import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

//import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
  birthday = new Date('August 11, 2001 13:00:00');
  timeDiff = Math.abs(Date.now() - this.birthday.getTime());
  age = Math.floor((this.timeDiff / (1000 * 3600 * 24))/365.25)

  ngOnInit() {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

     //Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('webgl') as HTMLCanvasElement,
        antialias: true,
        alpha: true
      })
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearAlpha(0)

      // Scene
      const scene = new THREE.Scene()

      // Base camera
      const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
      camera.position.z = 6
      scene.add(camera)

      //Load background texture
      const loader = new THREE.TextureLoader();

      const MarbelTexture1 = loader.load('assets/img/marbre1.jpg')
      const MarbelTexture2 = loader.load('assets/img/marbre2.jpg')
      const MarbelTexture3 = loader.load('assets/img/marbre3.jpg')
      const MarbelTexture4 = loader.load('assets/img/marbre4.png')

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
          object.position.y = (sizes.height / 1000)
          object.position.x = - (sizes.width / 350)
          object.position.z = -3
          object.rotation.y = - Math.PI / 4
          scene.add(object)
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
        object.position.y = (sizes.height / 500)
        object.position.x = (sizes.width / 350)
        object.position.z = -2
        object.rotation.y = - Math.PI / 4
        scene.add(object)
      }
  )

      objLoader.load(
          'assets/3D/pc.obj',
          (object) => {
            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                  sectionMeshes.push(child)
                  child.material = marbel3;
                  child.position.y = - (sizes.height / 200)
                  child.position.x = - (sizes.width / 500)
                  child.position.z = 1
                  child.rotation.y = - Math.PI / 4
                }
            } );
            scene.add(object)
          }
      )

      objLoader.load(
        'assets/3D/bouture.obj',
        (object) => {
          object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                sectionMeshes.push(child)
                child.material = marbel1;
                child.position.y = - (sizes.height / 69)
                child.position.x = (sizes.width / 750)
                child.position.z = 2
                child.rotation.y = - Math.PI / 4
                child.rotation.z = Math.PI / 8
                child.rotation.x = Math.PI / 8
              }
          } );
          scene.add(object)
        }
      )

      objLoader.load(
        'assets/3D/trompette.obj',
        (object) => {
          object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                sectionMeshes.push(child)
                child.material = marbel3;
                child.position.y = - (sizes.height / 40)
                child.position.x = - (sizes.width / 750)
                child.position.z = 2
                child.rotation.y = - Math.PI / 4
                child.rotation.z = - Math.PI / 8
                child.rotation.x = - Math.PI / 8
              }
          } );
          scene.add(object)
        }
      )

      objLoader.load(
        'assets/3D/morille.obj',
        (object) => {
          object.traverse( function ( child ) {
              if ( child instanceof THREE.Mesh ) {
                sectionMeshes.push(child)
                child.material = marbel1;
                child.position.y = - (sizes.height / 43)
                child.position.x = (sizes.width / 750)
                child.position.z = 2
                child.rotation.y = - Math.PI / 4
                child.rotation.z = Math.PI / 8
                child.rotation.x = Math.PI / 8
              }
          } );
          scene.add(object)
        }
      )

      window.addEventListener('resize', onWindowResize, false)
      function onWindowResize() {
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.render(scene, camera)
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
          camera.position.y = - scrollY / sizes.height * 4.5

          // Render
          renderer.render(scene, camera)

          // Call tick again on the next frame
          window.requestAnimationFrame(tick)
      }

      tick()
  }

  /*ngAfterViewInit() {
    const login = document.getElementById('webgl') as HTMLCanvasElement
    if(login != null){
      login.style.visibility = "collapse"
    }
  }*/
}