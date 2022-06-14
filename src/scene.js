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
    nftPostHash:nftPostHashHex,
    containerId: 'nft-container',
    hideElOnLoad: 'nft-preview-img'
  }

  console.log(nftViewer);
  console.log(params);
  nftViewer.initNFTs();

};
 


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


  /*** Example 2 - Load a model which is already an NFT ***/





