import * as THREE from 'three';    
import * as D3D from '3d-nft-viewer'
import { MeshBVH, acceleratedRaycast, MeshBVHVisualizer } from '3d-nft-viewer'

import Deso from 'deso-protocol';
const deso = new Deso();

const nftIsValid3D = (response) => {

  if(!response.PostFound){
    console.log('no post found');
    return false;
  };

  if(!response.PostFound.IsNFT){
    console.log('post is not NFT');
    console.log('propval: ',response.PostFound);

    return false;
  };

  if(!response.PostFound.PostExtraData){
     console.log('post has no ExtraData');
    return false;
  };

  if(!response.PostFound.PostExtraData['3DExtraData']){
     console.log('post has no 3DExtraData');
     return false;
  };

  return true;
}

export const createScene = (el, nftPostHashHex) => {
 
  const cdnWebUrl ='https://bitcloutweb.azureedge.net';
  const desoDataUrl = 'https://desodata.azureedge.net';


  console.log('nftPostHashHex: ',nftPostHashHex);
  //initialize NFT viewer front end
  let nftViewer = new D3D.D3DNFTViewer({
    el: document.body,
    defaultLoader: 'gltf',
    ctrClass: 'nft-ctr', // Attribute of div containing post and any additionl html
    nftDataAttr: 'data-nft', // Attribute of div.ctrClass containing post has hex
    nftsRoute: 'https://backend.nftz.zone/api/post/get3DScene',
    modelsRoute: 'https://desodata.azureedge.net', // Back end route to load models
    linkText: 'View in 3D',
    linkCtrCls: 'nft-viewer', // container for links such as view in 3d, view in vr
    previewCtrCls: 'container', //container element in which to create the preview
    skyboxes: true,
    skyboxPath: cdnWebUrl + '/public/3d/images/skyboxes',
    sceneryPath: cdnWebUrl + '/public/3d/layouts/round_showroom/scene.gltf',
    useShowroom: false,
    scaleModelToHeight: 5,
    scaleModelToWidth: 5,
    scaleModelToDepth: 5
  });


  fetch ('https://backend.nftz.zone/api/post/getnft?hash='+nftPostHashHex )
   .then((req)=>{
        req.json().then((nft)=>{
          console.log(nft);

          let extraDataParser = new D3D.ExtraData3DParser({ nftPostHashHex: nftPostHashHex,
                                                        extraData3D:nft.path3D,
                                                        endPoint:'https://desodata.azureedge.net/unzipped/'});

          let versions = extraDataParser.getAvailableVersions(0,'gltf');
          let path3D = versions[0];

          if(path3D.indexOf('.')>-1){
            let modelUrl = extraDataParser.getModelPath(0,'gltf','any');
            console.log('modelUrl: ',modelUrl);
            console.log('we have the full path, load model');

            // we have the full path, load model
            let params = {
              containerId: 'nft-ctr',
              hideElOnLoad: 'nft-img',
              nftPostHashHex: nftPostHashHex,
              modelUrl:modelUrl
            };
console.log('loadModel: ',params);
            nftViewer.loadModel(params)
            .then((item, model, pos)=>{

              if(nftViewer.loadedItem){ 
                // this confirms that the model is loaded
                nftViewer.start3D(); // start animation loop 
                showOverlay(); // display overlay
                addOverlayListeners(nftViewer); // add listeners to overlay
              };
            });

          } else {
            console.log('get path params and load NFT')
            // get path params and load NFT
           
            console.log('retrieve path from zip');
            let nftRequestParams = {
              postHex: nftPostHashHex,
              path: '/'+path3D,
              format: 'gltf'
            };
console.log('loadModel: ',nftRequestParams);
            /** Load the model immediately, or call the following code on click of a button ***/
            let params = {
              nftRequestParams:nftRequestParams,
              containerId: 'nft-ctr',
              hideElOnLoad: 'nft-preview-img',
              nftPostHashHex: nftPostHashHex,
              format:'gltf'
            };

            nftViewer.loadNFT(params)
            .then((item, model, pos)=>{
              if(nftViewer.loadedItem){ 
                // this confirms that the model is loaded
                nftViewer.start3D(); // start animation loop 
                showOverlay(); // display overlay
                addOverlayListeners(nftViewer); // add listeners to overlay
              }
            });


          }
    });

  });
}
 

  async function getThreeDPath(format){

    let result = 'https://desodata.azureedge.net';
    if(post.threedUrl){
      result = post.path3D;
    }else{


      if(post.path3D.toLowerCase().indexOf('.'+format) >-1 ){
        result+= '/unzipped/' +post.postHashHex + '/'+ post.path3D;
        
      }else{

        console.log('get 3d path for',format )
        switch (format){
          case 'glft':
          case 'gtlf':
          case 'gltf':
            console.log('gltf case')
            console.log(post.path3D.toLowerCase().indexOf('.glb'))
            //check glb
            if(post.path3D.toLowerCase().indexOf('.glb') >-1){
              console.log('path in ex data')
              result+= '/unzipped/' +post.postHashHex + '/'+ post.path3D;
            }else{
              const reqgltf = await fetch('https://backend.nftz.zone/api/post/get3DScene?postHex='+ post.postHashHex +'&path=/'+post.fullPath3D +'&format=gltf')
              result += await reqgltf.text();
            }
            break;
          default:
            const req = await fetch(getApi() + 'https://backend.nftz.zone/api/post/get3DScene?postHex='+ post.postHashHex +'&path=/'+post.fullPath3D +'&format='+ format)
            result += await req.text();
          break;
        }
      }
    }
    console.log('url 3d',result);
    
    return result;
  }

/* Add overlay options */
const showOverlay = () =>{
    let overlay = document.querySelector('div#nft-overlay-holder');
    overlay.style.display = 'inline-block';
    console.log('showOverlay!!!');
    console.log(overlay);
}
const addOverlayListeners = (nftViewer) =>{

  let skySelection = document.querySelector('select#sky');
  skySelection.addEventListener('change',(e)=>{
       nftViewer.setSkyBox(e.target.value);
  });

  let skyToggle = document.querySelector('input[name="3dsky"]');
      skyToggle.addEventListener('change',(e)=>{
      let checked = e.target.checked;
      if(checked){
        nftViewer.setSkyBox(skySelection.value);
      } else {
        nftViewer.removeSky();
      };
  });

  let roomToggle = document.querySelector('input[name="3dfloor"]');
      roomToggle.addEventListener('change',(e)=>{
      let checked = e.target.checked;
      if(checked){
        console.log('addScenery');

        nftViewer.addScenery();
      } else {
        console.log('removeScenery');

        nftViewer.removeScenery();
      };
  });

  let animations = nftViewer.loadedItem.getAnimations();
  if(!animations){
    hideAnimationOptions();

  } else {
    let animationSelection = document.querySelector('select#animation-select');

    populateAnimations(animationSelection, animations);
    showAnimationOptions();
    animationSelection.addEventListener('change',(e)=>{
      if(e.target.value>1){
        let loopType = getLoopTypeFromUI();
        let animIndex = parseInt(e.target.value)-1;
        console.log('startAnimation: '+animIndex);
        nftViewer.loadedItem.startAnimation(animIndex, THREE.LoopRepeat);
      } else {
        nftViewer.loadedItem.stopAnimation();
      }
    });
  }
 
}

const populateAnimations = (selectEl, animations) =>{

  let options = selectEl.getElementsByTagName('option');
  
  for (var i=options.length; i--;) {
      selectEl.removeChild(options[i]);
  };

  addOption(selectEl,-1, 'Play/Pause');
  for (var i = 0; i<animations.length; i++){
    let optionText = animations[i].name + ': '+animations[i].duration;
    addOption(selectEl,i, optionText);
  };

};

const addOption =  (selectEl,i, optionText) =>{
    var opt = document.createElement('option');
    opt.value = i+1;
    opt.innerHTML = optionText;
    selectEl.appendChild(opt);
}

const showAnimationOptions = () =>{
  let animationSelection = document.querySelector('select#animation-select');
      animationSelection.style.display = 'inline-block';

  let loopSelection = document.querySelector('label[for="3dloop"]');
      loopSelection.style.display = 'inline-block';
}
const hideAnimationOptions =() =>{
    let animationSelection = document.querySelector('select#animation-select');
      animationSelection.style.display = 'none';

  let loopSelection = document.querySelector('label[for="3dloop"]');
      loopSelection.style.display = 'none';
}

const getLoopTypeFromUI = () =>{
  let loopToggle = document.querySelector('input[name="3dloop"]');
  if(loopToggle.checked){
    return THREE.LoopRepeat;
  } else {
    return THREE.LoopOnce;
  }
}


/*** Example 1 - Load a model which is not an NFT ***
  let params = {
    modelUrl: 'http://localhost:3000/models/19f83fd2bbc0c5ef7ac31cccc067c765447016e60b68e4f0ddcba1e278c3fd89/gltf/normal/NanoWorld_gltf.gltf',
    containerId: 'nft-ctr',
    hideElOnLoad: 'nft-img"'
  }
/*
  nftViewer.loadModel(params)
  .then((item, model, pos)=>{
    // hide the loading message
    let loadingMessage = document.querySelector('.nft-viewer');
        loadingMessage.style.display = 'none';
        nftViewer.showOverlay();
        nftViewer.start3D();
  });

*/


