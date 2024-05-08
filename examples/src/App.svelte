<script>
  import Header from './components/Header.svelte';
  import Banner from './components/Banner.svelte';
  import Feature from './components/Feature.svelte';
  import Samples from './components/Samples.svelte';
  import Info from './components/Info.svelte';
  import Footer from './components/Footer.svelte';
</script>


<div id="app">
  <div>
    <Header />
    <div class="page-container">
      <div id="mainContainer" class="main-container">
        <Banner />
        <Feature />
        <Samples />
        <Info />
        <Footer />
      </div>
    </div>
  </div>
</div>