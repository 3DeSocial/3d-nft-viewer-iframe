<script>
	import { onMount } from 'svelte';
	import { createScene } from "./scene";

	let el;

	onMount(() => {
	console.log('creating scene');
		createScene(el);
	});
</script>

<form action="/feeds" method="post">
	<div class="ctr-box">
		<label for="username">Enter Deso Username:</label>
		<input name="username" type="text"/>
		<button>View NFTs</button>
	</div>
</form>
<ul class='nft-feed'>
<li class="nft-post" data-nft="23a0ec171c3d7420fcd530ad2d7d7c6d2341283ae78267d67fdbe6f90cc12aea">
		<p>DeSo Valentine&#x27;s gift to my frens and fam on DeSo

3D voxel heart in pink</p>
		<div class="container">
		<img class="nft-preview" src="https://images.deso.org/746201e0167a8176c3c0ca2b141b4ed2c92442a1d16a55ab999a558e8a831a28.gif"/>
		</div>
		<p class="nft-viewer" data-nft="0b88277db8b3ddac74537b3f5b10897865e0fea5edcc47c86547a36fd5cf6693">Loading...</p>
</li>
<li class="nft-post" data-nft="23a0ec171c3d7420fcd530ad2d7d7c6d2341283ae78267d67fdbe6f90cc12aea">
		<p>Happy 1st Birthday #DeSo! 
🥳🎂🎈🎇🎆🎉🎁

It&#x27;s been one whole year since DeSo came online so here is some cake freshly minted in full 3D to take to your #metaverse party!

To view the cake in full 3D you can visit https://3desocial.com/search and paste the link to this post into the search box.

If you have purchased the cake for $0 you can also log in and download the 3D model.

Enjoy your cake! 

&quot;Birthday Cake&quot; (https://skfb.ly/opxsU) by Sakthivel G is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</p>
		<div class="container">
		<img class="nft-preview" src="https://images.deso.org/080e2efc50a5cae7b4467ff2a9277dab2c8901fe69660343967297b4fdb79fac.gif"/>
		</div>
		<p class="nft-viewer" >Loading...</p>
</li>
<li class="nft-post" data-nft="4e42529372066f0fe48fdbf825a0a551ef506e8c844c6a827e3dcb9c1c158d4e">
		<p>Test Lambo Mint</p>
		<div class="container">
		<img class="nft-preview" src="https://images.deso.org/d1ed9567f10c7e1fa29fcd9a8a512023bcea3469f29ed47f10c775593b9f46e1.gif"/>
		</div>
		<p class="nft-viewer" data-nft="4e42529372066f0fe48fdbf825a0a551ef506e8c844c6a827e3dcb9c1c158d4e">Loading...</p>
</li>
<li class="nft-post"  data-nft="87de5605d1a90936e692ae87f3544f6022eac06a6f283544d7f88c3d6e610a5d">
		<p>Grab a piece of cake - it&#x27;s my birthday!</p>
		<div class="container">
		<img class="nft-preview" src="https://images.deso.org/0e104803eff4512c85f920c981568f4d02c7e41503297c8f0086041338487e93.gif"/>
		</div>
		<p class="nft-viewer" data-nft="87de5605d1a90936e692ae87f3544f6022eac06a6f283544d7f88c3d6e610a5d">Loading...</p>
</li>
<li class="nft-post" data-nft="a183b36867a953166bef9e3f5f461bb3b0c772da50093acf614331313fee2a8d">
		<p>This is Astrid. She is the first 3D dog minted on DeSo through the 3DeSocial 3D Minter. How exciting is that?! 
Astrid is a good girl for sure!</p>
		<div class="container">
		<img class="nft-preview" src="https://images.deso.org/1cc8a879113446ee30cb12cd5867835c5093334493898b160dfdda842ad3fa79.gif"/>
		</div>
		<p class="nft-viewer" data-nft="a183b36867a953166bef9e3f5f461bb3b0c772da50093acf614331313fee2a8d">Loading...</p>
</li>
<li class="nft-post" data-nft="db230dad7279c4165fc995ecb512d47f57b65322d29d8ad3de4e3006933fc72e">
		<p>Test lambo mint 2</p>
		<div class="container">
		<img class="nft-preview" src="https://images.deso.org/451364fd4557668a4b76a1e287a9737f52f4d44104ce5c1ef72559fecdf4e755.gif"/>
		</div>
		<p class="nft-viewer" data-nft="db230dad7279c4165fc995ecb512d47f57b65322d29d8ad3de4e3006933fc72e">Loading...</p>
</li>
<li class="nft-post" data-nft="e942aa869c0181a3dab09248d5604c9b3ff9f234058ccee6816acf260f52e08e">
		<p>Test lambo mint</p>
		<div class="container">
		<img class="nft-preview" src="https://images.deso.org/9a6f0f219fbb948e64f367dadf7aed173f88c2a3ff1c4715fb1318e139dc4ffe.webp"/>
		</div>
		<p class="nft-viewer" data-nft="e942aa869c0181a3dab09248d5604c9b3ff9f234058ccee6816acf260f52e08e">Loading...</p>
</li>
<li class="nft-post" data-nft="ff5f2ad8f78e0c9dd4b6813d734bbc480d8203039523803d6eaaa9376bd7f286">
		<p>Astrid in her jumper.
3D voxel model.</p>
		<div class="container">
		<img class="nft-preview" src="https://images.deso.org/fcec4e412d15711f6a6316a1d8f42ace742c6ba84e03692e44aac94b29cc132b.gif"/>
		</div>
		<p class="nft-viewer" data-nft="ff5f2ad8f78e0c9dd4b6813d734bbc480d8203039523803d6eaaa9376bd7f286">Loading...</p>
</li>
</ul>	

