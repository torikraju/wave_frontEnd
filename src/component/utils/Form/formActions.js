
export const validate = (element, formData = []) => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? 'Must be a valid email' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    const valid = element.value.trim() === formData[element.validation.confirm].value;
    const message = `${!valid ? 'Passwords do not match' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};


// eslint-disable-next-line no-unused-vars
export const update = (element, formData, formName) => {
  const updatedFormData = { ...formData };
  const updatedElement = { ...updatedFormData[element.id] };

  updatedElement.value = element.event.target.value;

  if (element.blur) {
    [updatedElement.valid, updatedElement.validationMessage] = validate(updatedElement, formData);
  }

  updatedElement.touched = element.blur;
  updatedFormData[element.id] = updatedElement;

  return updatedFormData;
};

// eslint-disable-next-line no-unused-vars
export const prepareFormData = (props, formName) => {
  const data = {};
  let formIsValid = true;

  // eslint-disable-next-line no-unused-vars
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      data[key] = props[key].value;
      formIsValid = props[key].valid && formIsValid;
    }
  }
  return { data, formIsValid };
};
