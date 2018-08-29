<template>
  <div class="modal-mask">
    <div class="modal-container">
      <div class="modal-body">
        <i style="font-size: 6em" class="fas fa-sync"></i>
      </div>
    </div>
  </div>
</template>

<style>
.modal-mask {
  position: absolute;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100vw;
  height: 100vh;
  margin: auto;
  padding: auto auto;
  background-color: rgba(255,255,255,0.85);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 0;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%)
}

</style>
