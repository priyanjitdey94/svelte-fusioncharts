<script>
  export let type = 'fusioncharts',
    view = 'desktop',
    dataId = '',
    cssClass = '',
    title = '',
    description = '',
    selected = false,
    badge = 'FusionTime',
    idUpdateHandler = () => {};
</script>

<button class="btn-none" on:click={() => { idUpdateHandler(dataId); }}>
<div data-id={dataId} class={(cssClass + (selected ? ' selected' : ''))}>
  {#if view === 'mobile'}
    <div class='p'>{title}</div>
  {:else}
    {#if type === 'fusioncharts'}
      <div class="h5">{title}</div>
      <div class="p item-desc">{description}</div>
    {:else}
      <div class="nav-group">
        <div class="h5">{title}</div>
        <div class="h5 badge badge-normal">{badge}</div>
      </div>
      <div class="p item-desc">{description}</div>
    {/if}
  {/if}
</div>
</button>
