<template>
  <div id="notification-container" class="fixed left-0 w-full transition-all gap-x-4" :class="{ '-bottom-24': !isVisible, '-bottom-0': isVisible }">
    <div role="alert" class="flex justify-between rounded-t-xl p-3 relative" :class="{ 'bg-success': type == 'success', 'bg-warning': type == 'warning', 'bg-error': type == 'error' }">
      <div class="flex items-center justify-start gap-x-2">
        <div>
          <Icon class="text-2xl" v-if="type == 'success'" icon="icon-park-solid:check-one" />
          <Icon class="text-2xl" v-if="type == 'error'" icon="uis:times-circle" />
          <Icon class="text-2xl" v-if="type == 'warning'" icon="ion:warning" />
        </div>
        <h1 class="text-white">{{ message }}</h1>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from "vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

export default defineComponent({
  components: {
    Icon,
  },
  name: "NotificationAlert",
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  mounted() {
    if (this.$props.isVisible) document.querySelector("#notification-container")?.classList.add("-bottom-0");
    else document.querySelector("#notification-container")?.classList.add("-bottom-24");
  },
  setup(props, { emit }) {
    watch(
      () => props.isVisible,
      (newValue: any) => {
        console.log(newValue);
        emit("update:isVisible", newValue);
        // if(newValue) {
        //     document.querySelector('#notification-container')?.classList.add('-bottom-24')
        //     document.querySelector('#notification-container')?.classList.remove('-bottom-0')
        // } else {
        //     document.querySelector('#notification-container')?.classList.remove('-bottom-24')
        //     document.querySelector('#notification-container')?.classList.add('-bottom-0')
        // }
      }
    );
    return { ...props };
  },
});
</script>
