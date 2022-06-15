import * as THREE from 'three';    
import * as D3D from '3d-nft-viewer'
import { MeshBVH, acceleratedRaycast, MeshBVHVisualizer } from '3d-nft-viewer'

export const createScene = (el, nftPostHashHex) => {

//initialize NFT viewer front end
  let nftViewer = new D3D.D3DNFTViewer({
    el: document.body,
    defaultLoader: 'gltf',
    ctrClass: 'nft-ctr', // Attribute of div containing post and any additionl html
    nftDataAttr: 'data-nft', // Attribute of div.ctrClass containing post has hex
    nftsRoute: 'http://localhost:3000/nfts', // Back end route to initialize NFTs
    modelsRoute: 'http://localhost:3000/models', // Back end route to load models
    linkText: 'View in 3D',
    linkCtrCls: 'nft-viewer', // container for links such as view in 3d, view in vr
    previewCtrCls: 'container', //container element in which to create the preview
    skyboxes: true,
    skyboxPath: 'http://localhost:3000/images/skyboxes/',
    sceneryPath: 'http://localhost:3000/layouts/round_showroom/scene.gltf',
    useShowroom: true,
    scaleModelToHeight: 5,
    scaleModelToWidth: 5,
    scaleModelToDepth: 5
  });

let params = {
    modelUrl: 'http://localhost:3000/models/'+nftPostHashHex+'/gltf/standard/scene.gltf',
    containerId: 'nft-ctr',
    hideElOnLoad: 'nft-img'
  }
console.log(params);
  nftViewer.loadModel(params)
  .then((item, model, pos)=>{
      if(nftViewer.loadedItem){ 
        // this confirms that the model is loaded
        nftViewer.start3D(); // start animation loop 
        showOverlay(); // display overlay
        addOverlayListeners(nftViewer); // add listeners to overlay
      }
  });

  /* load the nft specified by the nftPostHashHex **
  let params = {
    nftPostHash:nftPostHashHex,
    containerId: 'nft-ctr',
    hideElOnLoad: 'nft-img'
  }

  nftViewer.loadNFT(params)
  .then((item, model, pos)=>{
      if(nftViewer.loadedItem){ 
        // this confirms that the model is loaded
        nftViewer.start3D(); // start animation loop 
        showOverlay(); // display overlay
        addOverlayListeners(nftViewer); // add listeners to overlay
      }
  });
*/


};
 
/* Add overlay options */
const showOverlay = () =>{
    let overlay = document.querySelector('div#nft-overlay-holder');
    overlay.style.display = 'inline-block';

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


