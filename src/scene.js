import * as THREE from 'three';    
import { D3DNFTViewer } from '3d-nft-viewer'

export const createScene = (el) => {
//initialize NFT viewer front end
console.log('createScene');
  let nftViewer = new D3DNFTViewer({
    defaultLoader: 'gltf',
    ctrClass: 'nft-post', // Attribute of div containing post and any additionl html
    nftDataAttr: 'data-nft', // Attribute of div.ctrClass containing post has hex
    nftsRoute: 'http://localhost:3000/nfts', // Back end route to initialize NFTs
    modelsRoute: 'http://localhost:3000/models', // Back end route to load models
    linkText: 'View in 3D',
    previewCtrCls: 'container', //container element in which to create the preview
    skyboxes: true
  });
  nftViewer.initNFTs();
  console.log('initNFTs complete');
}

