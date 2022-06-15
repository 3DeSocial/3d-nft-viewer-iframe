# iframe server for 3d nfts

## iframe snippet for website hosting the iframe:

Include this anywhere any website:
```
<iframe class="nft-viewer" name="nft-viewer" src="http://localhost:5000?nftPostHashHex=4e42529372066f0fe48fdbf825a0a551ef506e8c844c6a827e3dcb9c1c158d4e" height="600" frameborder="0" scrolling="auto">
</iframe>
```
The source url should point to the server where this project or equivalent is hosted.

The source url serves a web page consisting of the HTML snippet below


### css snippet for website hosting the iframe

This snippet should go on the website hosting the iframe to ensure it is responsive:
```
<style type="text/css">
  iframe.nft-viewer {
    display: block;
    width: 800px;
    box-sizing: border-box;
    overflow: hidden; 
    margin: 0 auto;
    padding: 0px;
  }
</style>
```


## iframe content 


This is what appears inside the iframe.

The following template is for svelte. 

```
<div bind:this={el} id="nft-ctr" class="nft-ctr" data-nft="{nftPostHashHex}">
	<div class="container" id="nft-img">
		<img id="nft-preview-img" class="nft-preview" src="{previewMediaUrl}"/>
	</div>
	<div id="nft-overlay-holder" class="svelte-n8t4is" style="display:none;">
		<div id="nft-overlay" class="nft-3d-overlay svelte-n8t4is">
			<label for="3dsky" class="svelte-n8t4is">
				<input type="checkbox" name="3dsky" id="3dsky" class="svelte-n8t4is" checked>
				<br>Sky</label>
			<select id="sky" class="svelte-n8t4is">
				<option value="blue">space 1</option><option value="lightblue">space 2</option><option value="bluecloud">clouds 1</option><option value="browncloud">clouds 2</option><option value="yellowcloud">clouds 3</option></select>
			<label for="3dfloor" class="svelte-n8t4is">
				<input type="checkbox" name="3dfloor" id="3dfloor" class="svelte-n8t4is"><br>Room</label>
				<div class="background-option svelte-n8t4is" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%;"></div>
			<select style="display:none;" id="animation-select" class="svelte-n8t4is"></select>
			<label for="3dloop" style="display:none;" class="no-mobile svelte-n8t4is">
				<input type="checkbox" name="3dloop" id="3dloop" class="svelte-n8t4is"><br>Loop</label>
		</div>
	</div>
</div>	
```
### JavaScript for iframe contents

Please see the file scene.js for the svelte JavaScript to handle the 3D and UI functionality