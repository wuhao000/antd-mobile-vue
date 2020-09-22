import {computed, inject} from 'vue';


export const simpleFormComponentProps = {
  size: {type: String},
  required: {type: Boolean, default: false},
  disabled: {type: Boolean},
  readOnly: {type: Boolean},
  error: {type: Boolean, default: false},
  errorMessage: {type: String},
  errorDisplayType: {type: String}
};

export const useSimpleFormComponent = (props) => {
  const form = inject('list') as any;

  const isDisabled = computed(() => {
    let disabled = props.disabled;
    if (form) {
      if (!disabled) {
        disabled = form.disabled;
      }
    }
    return disabled;
  });

  const componentSize = computed(() => {
    let size = props.size;
    if (form) {
      if (size === undefined || size === null) {
        size = form.size;
      }
    }
    return size;
  });

  const isReadonly = computed(() => {
    let isReadonly = props.readOnly;
    if (form) {
      if (!isReadonly) {
        isReadonly = !form.editable;
      }
    }
    return isReadonly;
  });
  return {
    isDisabled, componentSize, isReadonly
  };
};
