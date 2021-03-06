import React from "react";

export class FormClass {
  constructor(config, onUpdateFun, blurDelay) {
    this.onUpdateFunc = onUpdateFun;
    this.blurDelay = blurDelay;
    this.init(config);
    this.isFormValid();
  }

  init(config) {
    this.config = config;
    this.data = {
      config,
      values: {},
      state: {},
      errors: {},
    };
    this.enteries = Object.entries(config);

    const values = {};
    const state = {};
    const errors = {};

    for (const [key, fieldConfig] of this.enteries) {
      if (fieldConfig.defaultValue) {
        values[key] = fieldConfig.defaultValue;
      } else {
        values[key] = undefined;
      }
      state[key] = undefined;
      errors[key] = undefined;
    }

    this.data.state = state;
    this.data.values = values;
    this.data.errors = errors;
    this.data.state.formValid = undefined;
  }
  isFormValid() {
    let isValid;
    let validCount = 0;
    Object.values(this.data.errors).forEach((v) => {
      if (typeof v === "string") {
        isValid = false;
      } else if (v === true) {
        validCount += 1;
      }
    });
    if (validCount === this.config.validatorsCount) {
      isValid = true;
    }
    return isValid;
  }
  isFieldValid(f) {
    return typeof this.data.errors[f] === "string";
  }

  onBlur(f) {
    this.blurTimeout = setTimeout(() => {
      this.onChange(f, this.data.values[f]);
    }, this.blurDelay);
  }
  onChange(f, v) {
    if (f) {
      this.data.values[f] = v;
      this.validate(f);
    }

    if (this.onUpdateFunc) {
      this.onUpdateFunc({ ...this.data });
    }
  }

  getValue(f) {
    return this.data.values[f];
  }
  getError(f) {
    return this.data.errors[f];
  }
  getData() {
    return { ...this.data };
  }

  validate(f) {
    const fieldConfig = this.config[f];
    let error = false,
      state = {};

    if (fieldConfig && typeof fieldConfig.validate === "function") {
      error = fieldConfig.validate(this.data.values[f]);
      state = Boolean(error);
    }
    this.data.errors[f] = error;
    this.data.state[f] = state;
    const _isFormValid = this.isFormValid();
    this.data.state.formValid = _isFormValid;
    this.data.isValid = _isFormValid;
    return this.getData();
  }
  reset(fireOnChange = true) {
    this.init(this.config);
    window.clearTimeout(this.blurTimeout);
    if (fireOnChange) {
      this.onChange();
    }
  }

  static init(config, cb) {
    const newForm = new Form(config, cb);
    return React.useRef(newForm).current;
  }
}

export const FormField = (props) => {
  const { form, name } = props;
  return React.createElement(
    React.Fragment,
    null,
    React.cloneElement(props.children, {
      value: form.getData().values[name],
      onChange: (e) => {
        form.onChange(name, e.target.value);
      },
      onBlur: () => form.onBlur(name),
      helperText: form.getError(name),
      error: form.getError(name),
    })
  );
};

export const Form = React.forwardRef((props, ref) => {
  const { onUpdate, blurDelay = 0, validateOnInit = false } = props;
  const [initialized, setInitialized] = React.useState(false);

  const form = React.useRef(new FormClass({}, onUpdate, blurDelay)).current;

  if (typeof onUpdate === "function") {
    form.onUpdateFunc = onUpdate;
  }

  React.useEffect(() => {
    const valuesArray = Object.entries(form.data.values);

    if (validateOnInit) {
      valuesArray.forEach((v) => {
        form.validate(v[0]);
      });
      form.onChange();
    }

    setInitialized(true);

    return () => form.reset(false);
  }, []);

  React.useImperativeHandle(ref, () => ({
    reset: () => {
      form.reset();
    },
    validate: () => {
      form.validate();
    },
  }));
  let children = React.Children.toArray(props.children);

  return React.createElement(
    React.Fragment,
    null,
    children.map((c, i) => {
      if (!React.isValidElement(c)) {
        return;
      }
      let name, validate, defaultValue, value;
      if (c.props) {
        name = c.props.name;
        validate = c.props.validate;
        defaultValue = c.props.defaultValue;
        value = c.props.value;
      }

      if (!form.config.validatorsCount) {
        form.config.validatorsCount = 0;
      }
      if (name) {
        if (!form.config[name]) {
          form.config[name] = {};
        }

        if (!initialized) {
          if (typeof validate === "function") {
            form.config[name].validate = c.props.validate;
            form.config.validatorsCount += 1;
          }
          if (defaultValue) {
            form.data.values[name] = defaultValue;
            form.config[name].defaultValue = defaultValue;
          } else if (value) {
            form.data.values[name] = value;
            form.config[name].defaultValue = undefined;
          } else {
            form.data.values[name] = undefined;
            form.config[name].defaultValue = undefined;
          }
        }
      }
      let childProps =
        typeof name !== "undefined"
          ? {
              key: i,
              validate: undefined,
              defaultValue,
              value,
              onChange: (e) => {
                form.onChange(name, e.target.value);
              },
              onBlur: () => form.onBlur(name),
              helperText: React.createElement(
                "span",
                null,
                form.getError(name)
              ),
              error: form.isFieldValid(name),
            }
          : { key: i };
      return React.cloneElement(c, childProps);
    })
  );
});
export default Form;
