// Sends the Webflow contact form to /api/contact instead of Webflow's form service.
// Runs in the capture phase so webflow.js's own submit handler never fires, and mirrors
// its behavior: "Please wait..." on the button, then the form's done or fail box.
(function () {
  document.addEventListener(
    'submit',
    function (e) {
      var form = e.target
      if (!form || form.id !== 'email-form' || !form.closest('.w-form')) return
      e.preventDefault()
      e.stopImmediatePropagation()

      var wrap = form.closest('.w-form')
      var done = wrap.querySelector(':scope > .w-form-done')
      var fail = wrap.querySelector(':scope > .w-form-fail')
      var btn = form.querySelector('input[type="submit"]')
      var data = new FormData(form)

      if (form.querySelector('.g-recaptcha') && !data.get('g-recaptcha-response')) {
        alert("Please confirm you're not a robot.")
        return
      }

      var label = btn && btn.value
      if (btn) {
        btn.value = btn.getAttribute('data-wait') || label
        btn.disabled = true
      }
      if (fail) fail.style.display = 'none'

      fetch('/api/contact', { method: 'POST', body: data })
        .then(function (res) {
          return res.ok
        })
        .catch(function () {
          return false
        })
        .then(function (ok) {
          if (btn) {
            btn.value = label
            btn.disabled = false
          }
          if (ok) {
            form.reset()
            form.style.display = 'none'
            if (done) done.style.display = 'block'
          } else {
            if (fail) fail.style.display = 'block'
            if (window.grecaptcha) window.grecaptcha.reset()
          }
        })
    },
    true,
  )
})()
