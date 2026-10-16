# Anvora Technology Solutions

The company website for Anvora Technology Solutions. It is a static site built with plain HTML, CSS and JavaScript, with no build step.

## Project structure

```
index.html        Main page (all sections)
css/style.css     Styling, including responsive layout and reduced-motion support
js/script.js      Mobile menu, demo links, and the "Suggest an App" form
```

## Running locally

Open `index.html` in a browser, or serve the folder with any static server, for example:

```
npx serve .
```

## Configuration checklist

Before publishing, update the following in `index.html`:

1. **Contact details**: the email and phone number in the `#contact` section.
2. **Demo links**: replace `href="#"` on the School ERP, Beauty Parlour and Learning App demo links with the live application URL. Links that already have a real URL (such as Pathology Lab) work as they are.
3. **Copy**: service and solution descriptions, which are placeholders in several cards.
4. **Logo**: the header uses a text "A" mark. Replace it with a real logo if you have one.

## Idea form (EmailJS)

The "Suggest an App" form sends submissions through [EmailJS](https://www.emailjs.com/), so no backend is needed. To set it up or change it:

1. Create a service and an email template in the EmailJS dashboard. The template should use the variables `name`, `phone`, `email`, `business` and `message`.
2. Put your Public Key, Service ID and Template ID in `js/script.js` (the `EMAILJS_*` constants).
3. The EmailJS browser SDK is loaded from jsDelivr with a pinned version in `index.html`. Update it deliberately, not automatically.

If the EmailJS script cannot load, the form shows an error message instead of failing silently.

For submissions stored in a database later, a backend or contact API can replace the EmailJS call in `js/script.js`.
