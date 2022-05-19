<script>
	import { onMount } from 'svelte';
	import { createScene } from "./scene";

	let el;

	onMount(() => {
	console.log('creating scene');
		createScene(el);
	});
</script>

<canvas bind:this={el}></canvas>
