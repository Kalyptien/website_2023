import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class HeaderScene extends THREE.Scene{

    private readonly gltfLoader = new GLTFLoader()

    async initialize(){
        //Light
        const light = new THREE.AmbientLight(0xFFFFFF, 10)
        this.add(light)

        // Object
        const scene = this
        this.gltfLoader.load( 'assets/3D/morille.gltf', function (gltf)
        {
            const objHead = gltf.scene as THREE.Object3D  // sword 3D object is loaded
            objHead.position.x = -1
            objHead.position.y = -0.5
            
            scene.add(objHead)
            console.log(objHead)
        } )
    }

    update(){
        //update
    }
}