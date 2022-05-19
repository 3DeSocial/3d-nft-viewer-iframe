import * as THREE from 'three';    
import { D3DNFTViewer } from '3d-nft-viewer'

export const createScene = (el) => {
//initialize NFT viewer front end
  let nftViewer = new D3DNFTViewer({
    defaultLoader: 'gltf',
    ctrClass: 'nft-viewer', // Attribute of div containing image
    nftDataAttr: 'data-nft', // Attribute of div.ctrClass containing post has hex
    nftsRoute: 'nfts', // Back end route to initialize NFTs
    modelsRoute: 'models', // Back end route to load models
    linkText: 'View in 3D',
    previewCtrCls: 'post-wrapper', //container element in which to create the preview
    skyboxes: true
  });
  nftViewer.initNFTs();
  console.log('initNFTs complete');
}

