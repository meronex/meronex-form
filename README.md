# Meronex Form

Simple React forms with validation for React MUI.

## Features

-   ✅ Validate onBlur or onChange
-   ✅ Same API for classes and functional components
-   ✅ Easy to fork and modify to your needs

![demo](https://merobase-photos.s3-eu-west-2.amazonaws.com/nQEPuETDDvaNFBm6w/m_form.gif)

## Usage

1. Install **`npm i @meronex/form`**

2. Import `import Form from '@meronex/form';`

3. Add the form
   `<Form ref={validatedForm} onUpdate={(_formData) => { setFormData(_formData); }} blurDelay={500}> ... React MUI Fields Here </Form`

    Notice that we've a **`ref`** attached which exposes a **`validatedForm.reset(`**) method and we've an **`onUpdate`** method which is triggered every time there change to the form. The **blurDelay** default is zero, and it used to delay blur validation to allow time for animation etc.

4. Add the @material-ui fields with name (required), defaultValue (optional for edit forms) and validator (optional for validation) attributes.

    `<TextField name={'name'} label="Name" defaultValue={'a'} validate={(v) => { if (!v || v === '') return 'Name is required..!!'; return true; }} />`

    That's it! The onUpdate will be triggered with all the form data, you can then set it to the state object.

    note that the defaultValue and validator are optional. You only need the name attribute for the form to hook for the field. Also, this works with the TextField using select attribute.

### Props & Functions

| Prop           | Description                                            |
| -------------- | ------------------------------------------------------ |
| name \*        | Required field to hook the form to the field           |
| defaultValue   | Optional default value                                 |
| validator      | Validator function to be triggered onBlur              |
| blurDelay      | Intenger to delay triggering the blur validation in ms |
| validateOnInit | Boolean value to validiate on form init                |

The Form also exposes the following ref functions:

| Function   | Description             |
| ---------- | ----------------------- |
| reset()    | Reset the form          |
| validate() | Force validate the form |

## Why?

1. Dead-simple API
2. Minimal documentation/concepts
3. Easy to fork, copy and modify (it is only a single file with no build step)
4. Zero dependencies
5. Extremely tiny (1.2kb minified + gzipped)

## How it works?

The Form component will bind methods/props to the child fields. The `value, onBlur, onChange, error and helperText` props are automatically handled, a form object is created to capture the state of the form and that object is passed to the onUpdate method with every change.

## Other libraries

-   Looking for React Icons? try [Meronex Icons](https://icons.meronex.com/)
