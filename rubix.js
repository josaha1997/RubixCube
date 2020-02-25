let scene,camera,renderer,geometry;
var cameraControls;
var cube;
var bottomRow = new THREE.Group();
var topRow = new THREE.Group();

let init=function()
{
    scene=new THREE.Scene();
    scene.background=new THREE.Color(0x000000);
    camera=new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight,1,1000);
    camera.position.z=17;

    rubixCube();

    renderer=new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    cameraControls =new THREE.TrackballControls(camera, renderer.domElement);
    cameraControls.target.set(0, 0, 0);
    
};			

let mainLoop=function()
{
    renderer.render(scene,camera);
    requestAnimationFrame(mainLoop);

    //topRow.rotation.y+=0.01;
    //bottomRow.rotation.y-=0.01;

    cameraControls.update();
};
function cubeCreate(cubeLength,dimension,numberOfCubes)
{
    var offset=cubeLength+((5/100)*cubeLength);
    geometry=new THREE.BoxGeometry(cubeLength,cubeLength,cubeLength);
    cube=new Array(dimension);
    for(var i=0;i<cube.length;i++)
    {
      cube[i]=new Array(numberOfCubes);
    }
    var colorMaterials;
    colorMaterials=[
        new THREE.MeshMatcapMaterial({color:0x048f0b,side: THREE.FrontSide}),//RIGHT
        new THREE.MeshMatcapMaterial({color:0x0000ff,side: THREE.FrontSide}),//LEFT
        new THREE.MeshMatcapMaterial({color:0xff0000,side: THREE.FrontSide}),//TOP 
        new THREE.MeshMatcapMaterial({color:0xff6600,side: THREE.FrontSide}),//BOTTOM
        new THREE.MeshMatcapMaterial({color:0xe5e5e5,side: THREE.FrontSide}),//FRONT
        new THREE.MeshMatcapMaterial({color:0xecf013,side: THREE.FrontSide})//BACK
    ];
    var currentCol=(numberOfCubes/dimension);
 var k=0;
 var r=0;
    for (var i = 0; i < dimension; i++) 
    { 
        for (var j = 0; j < numberOfCubes; j++) 
        {

            let material=new THREE.MeshFaceMaterial(colorMaterials);
            cube[i][j] =new THREE.Mesh(geometry,material);
            
            if(j==currentCol)
            {
                currentCol+=dimension;
                k=0;
                r++;
            
            }
            if(j<currentCol)
            {             
                //document.writeln("si: "+i+"sj: "+j+"sk: "+k+"sr: "+r);
                 cube[i][j].position.x+=offset*(++k);
                 cube[i][j].position.y-=offset*r;
               
                 cube[i][j].position.z-=offset*i;
            }
           
            
        
            
            
            /*if(j>((numberOfCubes/dimension-1)+dimension))
            {
                cube[i][j].position.x+=offset;
                //cube[i][j].position.y-=offset;
            }

            if(i>0)
            {
                cube[i][j].position.z-=offset;
            }*/
            
            //original static code starts here
            /*if(j==2 || j==5 || j==8)
            {
                cube[i][j].position.x-=offset;

            }
            if(j>2 && j<6)
            {
                cube[i][j].position.y+=offset;

            }
            if(j>5)
            {
                cube[i][j].position.y+=offset*2;
            }
            if(j==1 || j==4 || j==7)
            {
                cube[i][j].position.x+=offset;

            }

            if(i==1)
            {
                cube[i][j].position.z-=offset;
            }
            else if(i==2)
            {
                cube[i][j].position.z-=offset*2;

            }*/
            
        
        } 
        currentCol=(numberOfCubes/dimension);
        k=0;
        r=0;
    } 

    for (var i = 0; i < dimension; i++) { 
        for (var j = 0; j < numberOfCubes; j++) { 
                scene.add(cube[i][j]);
               
        }
    }

    createGroups(dimension,numberOfCubes);

};

let createGroups=function(dimension,numberOfCubes)
{
    for (var i = 0; i < dimension; i++) 
    { 
        for (var j = 0; j < numberOfCubes; j++)  
        {
            if(j<3)
            {
                bottomRow.add(cube[i][j]);
                scene.add(bottomRow);

            } 
            if(j>5)
            {
                topRow.add(cube[i][j]);
                scene.add(topRow);
            }
        
        }

    }
}

let rubixCube=function()
{
    var dimension=10;
    var numberOfCubes=Math.pow(dimension,2);
    cubeCreate(0.5,dimension,numberOfCubes);
   


}
init();
mainLoop();