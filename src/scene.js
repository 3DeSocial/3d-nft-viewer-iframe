import * as THREE from 'three';    
import * as D3D from '3d-nft-viewer'

export const createScene = (el) => {

//initialize NFT viewer front end
  let nftViewer = new D3D.D3DNFTViewer({
    defaultLoader: 'gltf',
    ctrClass: 'nft-post', // Attribute of div containing post and any additionl html
    nftDataAttr: 'data-nft', // Attribute of div.ctrClass containing post has hex
    nftsRoute: 'http://localhost:3000/nfts', // Back end route to initialize NFTs
    modelsRoute: 'http://localhost:3000/models', // Back end route to load models
    linkText: 'View in 3D',
    linkCtrCls: 'nft-viewer', // container for links such as view in 3d, view in vr
    previewCtrCls: 'container', //container element in which to create the preview
    skyboxes: true,
    skyboxPath: 'http://localhost:3000/images/skyboxes',
    sceneryPath: 'http://localhost:3000/layouts/round_showroom/scene.gltf',
    useShowroom: true,
    scaleModelToHeight: 5,
    scaleModelToWidth: 5,
    scaleModelToDepth: 5
  });


/*** Example 1 - Load a model which is not an NFT ***/
  let params = {
    modelUrl: 'http://localhost:3000/models/e942aa869c0181a3dab09248d5604c9b3ff9f234058ccee6816acf260f52e08e/gltf/standard/scene.gltf',
    containerId: 'nft-container',
    hideElOnLoad: 'nft-preview-img'
  }

  nftViewer.loadModel(params)
  .then((item, model, pos)=>{
    // hide the loading message
    let loadingMessage = document.querySelector('.nft-viewer');
        loadingMessage.style.display = 'none';
  });


  /*** Example 2 - Load a model which is already an NFT ***/

/*
  let params = {
    nftPostHash: 'e942aa869c0181a3dab09248d5604c9b3ff9f234058ccee6816acf260f52e08e',
    containerId: 'nft-container',
    hideElOnLoad: 'nft-preview-img'
  }

  nftViewer.loadNFT(params)
  .then((item, model, pos)=>{
    // hide the loading message
    let loadingMessage = document.querySelector('.nft-viewer');
        loadingMessage.style.display = 'none';
  })*/
}

