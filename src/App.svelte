<script>
	import { onMount } from 'svelte';
	import { createScene } from "./scene";

	let el;

	onMount(() => {
	console.log('creating scene');
		createScene(el);
	});
</script>


<ul class='nft-feed'>
<li class="nft-post" data-nft="e942aa869c0181a3dab09248d5604c9b3ff9f234058ccee6816acf260f52e08e">
		<p>Test lambo mint</p>
		<div class="container" id="nft-container">
		<img id="nft-preview-img" class="nft-preview" src="https://images.deso.org/9a6f0f219fbb948e64f367dadf7aed173f88c2a3ff1c4715fb1318e139dc4ffe.webp"/>
		</div>
		<p class="nft-viewer" data-nft="e942aa869c0181a3dab09248d5604c9b3ff9f234058ccee6816acf260f52e08e">Loading...</p>
		<form id="nft-overlay" class="nft-3d-overlay">
		    <dl>
		      <dt>Show Scenery</dt>
		      <dd><input type="checkbox" id="floor" name="floor" value="Show Floor" checked="checked"/></dd>
		      <dt>Show Sky</dt>
		      <dd><input type="checkbox" id="sky" name="sky" value="Show Sky" checked="checked"/></dd>
		    </dl>
  		</form>  
</li>
</ul>	

  

