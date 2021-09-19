# Meronex Form

## A very simple React forms validation for React MUI.


🚧 Note that this an early version and still being tested_

![demo](https://merobase-photos.s3-eu-west-2.amazonaws.com/nQEPuETDDvaNFBm6w/m_form.gif)

## Features

- Validate onBlur or onChange
- Same API for classes and functional components 
- Easy to fork and modify to your needs

## Usage
1. Install **`npm i @meronex/form`**
3. Import `import Form from '@meronex/form';`

2.  Add the form
    `<Form ref={validatedForm} onUpdate={(_formData) => { setFormData(_formData); }}> ... React MUI Fields Here </Form`

     Notice that we've a **`ref`** attached which exposes a **`validatedForm.reset(`**) method and we've an **`onUpdate`** method which is triggered every time        there change to the form.

3.  Add the @material-ui fields with name, defaultValue and validator attribute.

    `<TextField name={'name'} label="Name" defaultValue={'a'} validate={(v) => { if (!v || v === '') return 'Name is required..!!'; return true; }} />`

    That's it! The onUpdate will be triggered with all the form data, you can then set it to the state object.

## Why?

I wanted a validation component for few inputs I have, and I found
the existing libraries to be either too complex or too rigid for my use case.

1. Minimal and dead-simple API
2. Minimal documentation/concepts
3. Easy to fork and modify
4. No dependencies

## How it works?

The Form component will bind methods/props to the child fields. The `value, onBlur, onChange, error and helperText` props are automatically handled, a form object is created to capture the state of the form and that object is passed to the onUpdate method with every change.
