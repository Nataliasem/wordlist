<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-body">
          <h2 class="modal-body__header">
            <slot name="header" />
          </h2>

          <div>
            <slot name="content" />
          </div>

          <div class="modal-body__footer">
            <button
              type="button"
              class="modal-button modal-button__confirm"
              @click="emit('confirm')"
            >
              <slot name="confirm-text" />
            </button>
            <button
              type="button"
              class="modal-button modal-button__cancel"
              @click="emit('cancel')"
            >
              <slot name="cancel-text">Cancel</slot>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  show: Boolean
})
const emit = defineEmits([ 'confirm', 'cancel' ])
</script>

<style scoped>
.modal-mask {
  position: absolute;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px;
  transition: opacity 0.3s ease;
}

.modal-body {
  background-color: white;
  min-height: 30%;
  max-height: 80%;
  width: 40%;
  overflow: scroll;
  border-radius: 4px;
  padding: 0 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Special styles for Transition component */
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-body__header {
  position: sticky;
  top: 0;
  background-color: white;
  padding-top: 32px
}

.modal-body__footer {
  display: flex;
  gap: 16px;
  justify-content: end;
  position: sticky;
  bottom: 0;
  background-color: white;
  padding-bottom: 32px;
}

.modal-button {
  color: white;
  font-weight: bold;
  padding: 8px;
  transition: background-color 0.3s ease;
}

.modal-button__confirm {
  background-color: rebeccapurple;
}

.modal-button__confirm:hover {
  background-color: mediumpurple;
}

.modal-button__cancel {
  background-color: darkred;
}

.modal-button__cancel:hover {
  background-color: orangered;
}
</style>
