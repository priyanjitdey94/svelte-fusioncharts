<script>
  import CodeMirror from 'codemirror';
  import vue from 'codemirror/mode/vue/vue';
  import js from 'codemirror/mode/vue/vue';
  import 'codemirror/theme/dracula.css';

  import sampleConfig from '../helpers/samples';
  import { onMount, afterUpdate } from 'svelte';

  import ListItem from './ListItem.svelte';
  import ChartViewer from './ChartViewer.svelte';

  import listItemInfoAr from './utils/list-item-info.js';

  let listItemInfo = listItemInfoAr,
    chartCode,
    jsonCode,
    jsBtn,
    dataBtn,
    schemaBtn,
    modal,
    modalSelector,
    sampleId = 'simple-chart',
    curItem = listItemInfo[0];

  const updateSampleId = id => {
      sampleId = id;
      listItemInfo = listItemInfo.map(item => {
        item.selected = false;
        if (item.dataId === id) {
          curItem = item;
          item.selected = true;
          modalSelector.innerHTML = item.title;
        }
        return item;
      });
    },
    showJS = () => {
      if (!jsBtn.classList.contains('selected')) {
        jsBtn.classList.add('selected')
      }
      jsonCode.setOption('mode', 'vue');
      jsonCode.setValue(sampleConfig[sampleId].code + '\n\n' + sampleConfig[sampleId].html);
      dataBtn.classList.remove('selected');
      schemaBtn && schemaBtn.classList.remove('selected');
    },
    showData = () => {
      if (!dataBtn.classList.contains('selected')) {
        dataBtn.classList.add('selected')
      }
      jsonCode.setOption('mode', 'javascript');
      jsonCode.setValue(sampleConfig[sampleId].data);
      jsBtn.classList.remove('selected');
      schemaBtn && schemaBtn.classList.remove('selected');
    },
    showSchema = () => {
      if (!schemaBtn.classList.contains('selected')) {
        schemaBtn.classList.add('selected')
      }
      jsonCode.setOption('mode', 'javascript');
      jsonCode.setValue(sampleConfig[sampleId].schema || '');
      dataBtn.classList.remove('selected');
      jsBtn.classList.remove('selected');
    },
    toggleModal = state => {
      if (state === 'hide') {
        if (!modal.classList.contains('hidden')) {
          modal.classList.add('hidden');
        }
      } else {
        modal.classList.remove('hidden');
      }
    };

  onMount(() => {
    jsonCode = CodeMirror(chartCode, {
      tabSize: '2',
      smartIndent: true,
      lineNumbers: true,
      readOnly: true,
      theme: 'dracula',
      mode: 'vue'
    });
  });

  afterUpdate(() => {
    jsonCode.setOption('mode', 'vue');
    jsonCode.setValue(sampleConfig[sampleId]['code'] + '\n\n' + sampleConfig[sampleId]['html']);

    dataBtn.classList.remove('selected');
    schemaBtn && schemaBtn.classList.remove('selected');

    if (!jsBtn.classList.contains('selected')) {
      jsBtn.classList.add('selected')
    }
  });
</script>

<style>
  .lowercase-btn {
    text-transform: none;
  }
</style>

<!-- Demo Section start -->
<div class="demo bg-light-purple pt-4 pb-4">
  <div class="container container-1200 info-wrapper">
    <!-- Chart selection for mobile devices - start -->
    <div class="row">
      <div class="col-12 d-flex justify-content-center d-md-none">
        <button class="btn-none" on:click={() => { toggleModal('show'); }}>
        <div id="mobileChart-selector" class="base-dropdown chart-selector">
          <div class="selector" bind:this={modalSelector} >A Simple Chart</div>
          <div class="placeholder">Quick Demo:</div>
          <div class="caret">
            <i class="fc_dropdown"></i>
          </div>
        </div>
        </button>
      </div>
    </div>
    <!-- Modal for selection (Only for Mobile Devices) -->
    <button class="btn-none" on:click={() => { toggleModal('hide'); }}>
    <div id="myModal" class="modal hidden" bind:this={modal}>

      <!-- Modal content -->
      <div class="modal-content">
        <div class="nav-list">
          {#each listItemInfo as info}
            <ListItem
              view={'mobile'}
              type={info.type}
              dataId={info.dataId}
              cssClass={info.cssClass}
              selected={info.selected}
              title={info.title}
              description={info.description}
              badge={info.badge}
              idUpdateHandler={updateSampleId}
            />
          {/each}
        </div>
      </div>
    </div>
    </button>
    <!-- Chart selection for mobile devices - end -->

    <div class="row">
      <div class="side-nav col-3 d-none d-md-block">
        <div class="nav-heading">Quick Demo:</div>
        <div class="nav-list">
          {#each listItemInfo as info}
            <ListItem
              type={info.type}
              dataId={info.dataId}
              cssClass={info.cssClass}
              selected={info.selected}
              title={info.title}
              description={info.description}
              badge={info.badge}
              idUpdateHandler={updateSampleId}
            />
          {/each}
        </div>
      </div>
      <div class="col-md-9 col-12">
        <div class="card shadow">
          <div class="card-body chart-wrapper">
            <div class="chart-wrapper-inner">
              <!-- render chart here -->
              <div id="chart-container-wrapper">
                <ChartViewer sampleId={sampleId} />
              </div>
            </div>
          </div>
        </div>

        <div class="code-view mt-2">
          <div class="card-shadow" style="background: #03040B;">
            <div class="code-nav-btns btn-group" role="group" aria-label="Basic example">
              <button
                bind:this={jsBtn}
                on:click={() => {
                  showJS('js');
                }}
                data-id="code"
                type="button"
                class="btn btn-code selected lowercase-btn"
              >
                Svelte
              </button>
              <button
                bind:this={dataBtn}
                on:click={() => {
                  showData('data');
                }}
                data-id="data"
                type="button"
                class="btn btn-code lowercase-btn"
              >
                data.js
              </button>
              {#if curItem.type === 'fusiontime'}
                <button
                  bind:this={schemaBtn}
                  on:click={() => {
                    showSchema('schema');
                  }}
                  data-id="schema"
                  type="button"
                  class="btn btn-code schema-btn lowercase-btn"
                >
                  schema.js
                </button>
              {/if}
            </div>
            <div class="card-body p-0">
              <div class="code-panel">
                <div class="code-panel-header">
                  <div bind:this={chartCode} id="chartCode"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Demo Section end -->