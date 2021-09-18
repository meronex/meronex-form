# Meronex Form

## Dead simple react form validation with React MUI.

_Note that this an early version and still being tested_

## Usage

1.  Import the library `import Form from '@meronex/form';`

2.  Add the parent form
    `<Form ref={validatedForm} onUpdate={(_formData) => { setFormData(_formData); }}> ... React MUI Fields Here </Form`

        Notice that we've a **`ref`** attached which exposes a **`validatedForm.reset(`**) method and we've an **`onUpdate`** method which is triggered every time there change to the form.

3.  Add the @material-ui fields with name, defaultValue and validator attribute.

    `<TextField name={'name'} label="Name" defaultValue={'a'} validate={(v) => { if (!v || v === '') return 'Name is required..!!'; return true; }} />`

    And that's it! The onUpdate will be triggered with all the form data and you can then set it to the state object.

## Why?

1. Minmal and dead-simple API
2. Minimal documentation/concepts
3. Easy to fork and modify

## How it works?

The Form component will bind methods/props to the child fields. The `value, onBlur, onChange, error and helperText` props are automatically handled, a form object is created to capture the state of the form and that object is passed to the onUpdate method with every change.
