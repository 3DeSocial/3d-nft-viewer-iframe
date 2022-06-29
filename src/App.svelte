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
		<div class="loader-ctr"><span class="loader"></span></div>

	</div>
	<div id="nft-overlay-holder" class="svelte-n8t4is" style="display:none;">
		<div id="nft-overlay" class="nft-3d-overlay svelte-n8t4is">
			<label for="3dsky" class="svelte-n8t4is">
				<input type="checkbox" name="3dsky" id="3dsky" class="svelte-n8t4is" checked><br>Sky
			</label>
			<select id="sky" class="svelte-n8t4is">
				<option value="blue">space 1</option><option value="lightblue">space 2</option><option value="bluecloud">clouds 1</option><option value="browncloud">clouds 2</option><option value="yellowcloud">clouds 3</option>
			</select>
			<label for="3dfloor" class="svelte-n8t4is">
				<input type="checkbox" name="3dfloor" id="3dfloor" class="svelte-n8t4is"><br>Room</label>
			<div class="background-option svelte-n8t4is" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%;"></div>
			<select style="display:none;" id="animation-select" class="svelte-n8t4is"></select>
			<label for="3dloop" style="display:none;" class="no-mobile svelte-n8t4is">
				<input type="checkbox" name="3dloop" id="3dloop" class="svelte-n8t4is"><br>Loop
			</label>
		</div>
	</div>
</div>	