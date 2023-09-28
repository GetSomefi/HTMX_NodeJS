document.getElementById("chat-form").addEventListener('htmx:xhr:loadstart', function(evt) {
    const form = document.querySelector("#msg");
    //console.log(form)
    form.value = "";
});