export default {
  beforeMount: (el, binding) => {
    el.clickOutsideEvt = (evt) => {
      if (
        !(
          el === evt.target ||
          el.contains(evt.target) ||
          evt.target.closest(".trigger")
        )
      ) {
        binding.value();
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvt);
  },
  unmounted: (el) => {
    document.body.removeEventListener("click", el.clickOutsideEvt);
  },
};
