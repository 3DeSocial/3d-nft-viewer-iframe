<script>
	import { onMount } from 'svelte';
	import { createScene } from "./scene";

	import Deso from 'deso-protocol';
	const deso = new Deso();

	let el;
	let src = '';
	let nftPostHashHex = '';
	let previewMediaUrl = '';
	const urlParams = new URLSearchParams(window.location.search);
  	nftPostHashHex = urlParams.get('nftPostHashHex');
	const request = {
		"PostHashHex": nftPostHashHex
	};

	deso.posts.getSinglePost(request).then((response)=>{
		if(response.PostFound.ImageURLs[0]){
			previewMediaUrl = response.PostFound.ImageURLs[0];
		}
	});

	onMount((el) => {

		console.log('nftPostHashHex: ',nftPostHashHex);
		createScene(el, nftPostHashHex );
	});

</script>
<div bind:this={el} id="nft-ctr" class="nft-ctr" data-nft="{nftPostHashHex}">
	<div class="container" id="nft-img">
		<img id="nft-preview-img" class="nft-preview" src="{previewMediaUrl}"/>
	</div>
	<form id="nft-overlay" class="nft-3d-overlay" style="display:none;">
	    <dl>
	      <dt>Show Scenery</dt>
	      <dd><input type="checkbox" id="floor" name="floor" value="Show Floor" checked="checked"/></dd>
	      <dt>Show Sky</dt>
	      <dd><input type="checkbox" id="sky" name="sky" value="Show Sky" checked="checked"/></dd>
	    </dl>
	</form>  
</div>	

  

