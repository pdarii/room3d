
class Room3d {
    constructor(sceneName, width, height) {
        this.sceneName = sceneName;
        this.scene;
        this.camera;
        this.renderer;
        this.innerWidth = width;
        this.innerHeight = height;
        this.geometry;
        this.controls;
        this.axisHelper;
        this.defaultWallWidth = 2;
        this.defaultWallHeight = 5;

    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.addControls();
        this.addAxisHelper();
        this.renderScene();
    }

    createScene(){
         this.scene = new THREE.Scene();
    }

    createCamera(){
        this.camera = new THREE.PerspectiveCamera( 75, this.innerWidth / this.innerHeight, 0.1, 1000 );
        this.camera.position.set(0, 0, 20);
        this.camera.lookAt( this.scene.position );

    }

    createRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            alpha: true, // remove canvas' bg color
            antialias: true
        });
        this.renderer.setSize(this.innerWidth, this.innerHeight);
        document.getElementById(this.sceneName).appendChild( this.renderer.domElement );
    }

    getWallsData() {
        // TODO Ajax call
        // Array of lines Start x,y -> End x,y
        const MOCK_DATA = [
            {
                x: 0,
                y: 0,
                x2: 10,
                y2: 10
            },
            {
                x: 10,
                y: 0,
                x2: 20,
                y2: 10
            }


        ]
        return MOCK_DATA;
    }

    buildScene() {

        const walls = this.getWallsData();
        const group = new THREE.Group();

        for(let i=0; i< walls.length; i++) {
            const wall = walls[i];
            group.add( this.createWall(wall) );
        }

        this.scene.add( {...group} );
        this.renderScene();
    }




    createWall(x1, y1, x2, y2) {
        var lengthX = Math.abs(x1 - x2);
        var lengthY = Math.abs(y1 - y2);

        // since only 90 degrees angles, so one of these is always 0
        // to add a certain thickness to the wall, set to 0.5
        if (lengthX === 0) lengthX = 0.5;
        if (lengthY === 0) lengthY = 0.5;

        // create a cube to represent the wall segment
        var wallGeom = new THREE.BoxGeometry(lengthX, 3, lengthY);
        var wallMaterial = new THREE.MeshPhongMaterial({
            color: 0xff0000,
            opacity: 0.8,
            transparent: true
        });

        // and create the complete wall segment
        var wallMesh = new THREE.Mesh(wallGeom, wallMaterial);

        // finally position it correctly
        wallMesh.position = new THREE.Vector3();

        mesh.position.setX(x1 - ((x1 - x2) / 2) - (self.height / 2));
        mesh.position.setY(wallGeom.height / 2);
        mesh.position.setZ(y1 - ((y1 - y2)) / 2 - (self.width / 2));

        //self.elements.push(wallMesh);


        return wallMesh;
    }


    createWall3(wallCoors){

        var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
        geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
        geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
        var line = new THREE.Line( geometry, material );

        return line;
    }

    createWall2(wallCoors){

        const geometry = new THREE.BoxBufferGeometry( this.defaultWallWidth, this.defaultWallHeight, wallCoors.size );
        const edges = new THREE.EdgesGeometry( geometry );

        const wall = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x0000ff } ) );
        wall.position.set( wallCoors.x, wallCoors.y, 0 );

        return wall;
    }


    addControls() {
        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.controls.update();
    }

    addAxisHelper() {
        this.axisHelper = new THREE.AxisHelper( 1.25 );
        this.scene.add( this.axisHelper );
    }

    renderScene() {
        requestAnimationFrame( ()=> {
            this.renderScene();
        });
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    cleanAll() {
        // TODO
    }


}
const room3d = new Room3d('scene', 500, 500);

window.onload = function() {
    room3d.init()
};

