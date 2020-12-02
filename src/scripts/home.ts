import '../styles/home.css';


if (window !== null){
    window.addEventListener('load', ()=>{

        const injectContainer = document.getElementsByClassName('inject')[0];
        console.log({ injectContainer });

        if (injectContainer){
            setTimeout(() => {
                const p = document.createElement("p");
                const cont = document.createTextNode("some injected text from JS generated from TS by webpack");
                p.appendChild(cont);

                injectContainer.appendChild(p);

                console.log({ p });

            }, 1500);
        }

    }, false);
}

