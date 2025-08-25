<template>
  <div>
    <div id="animationWrapper">
      <span class="tooltip" :data-tooltip="message">?</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    src: String,
    message: String
  }
};
</script>

<style scoped>
.tooltip {
  position: relative;
  background: #fff;
  padding: 2px 10px;
  margin: 5px;
  font-size: 20px;
  font-weight: bold;
  color: var(--magenta);
  border-radius: 10%;
  border: 1px solid var(--magenta);
}

.tooltip:before,
.tooltip:after {
  position: absolute;
  content: "";
  opacity: 0;
  transition: all 0.4s ease;
}

.tooltip:before {
  border-width: 0 8px 10px 8px;
  border-style: solid;
  border-color: transparent transparent var(--magenta) transparent;
  bottom: -15px;
  right: 7px;
  transform: translateY(20px);
}

.tooltip:after {
  content: attr(data-tooltip);
  background: var(--magenta);
  width: 160px;
  height: 40px;
  font-size: 13px;
  font-weight: 300;
  bottom: -75px;
  right: 0px;
  padding: 10px;
  border-radius: 5px;
  letter-spacing: 1px;
  transform: translateY(20px);
  color: white;
}

.tooltip:hover::before,
.tooltip:hover::after {
  opacity: 1;
  transform: translateY(-2px);
}

@keyframes shake {
  0% {
    transform: rotate(2deg);
  }
  50% {
    transform: rotate(-3deg);
  }
  70% {
    transform: rotate(3deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

#animationWrapper:hover {
  animation: shake 500ms ease-in-out forwards;
}
</style>
