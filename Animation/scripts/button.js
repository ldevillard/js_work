const button = document.getElementById("button1");

button.addEventListener("click",
    function()
    {
        window.open("page2.html", "_self");
        console.log("button clicked!");
    }
)

button.addEventListener("mouseover",
    function()
    {
        button.classList.remove("disactive");
        button.classList.add("active");
        console.log("mouse over!");
    }
)

button.addEventListener("mouseleave",
    function()
    {
        button.classList.remove("active");
        button.classList.add("disactive");
        console.log("mouse leave!");
    }
)
