import '../styles/botDebug.css';


// let observe: { (arg0: HTMLElement | null, arg1: string, arg2: { (): void; (): void; (): void; (): void; (): void; }): void; (element: any, event: any, handler: any): void; (element: any, event: any, handler: any): void; };

const observe = function (element: HTMLInputElement, event: string, handler: EventListenerOrEventListenerObject) {
    element.addEventListener(event, handler, false);
};


function init () {
    const text = document.getElementById('message') as HTMLInputElement;
    function resize() {
        if (text) { 
            text.style.height = 'auto';
            text.style.height = text.scrollHeight + 'px';
        }
    }
    /* 0-timeout to get the already changed text */
    function delayedResize () {
        window.setTimeout(resize, 0);
    }
    observe(text, 'change',  resize);
    observe(text, 'cut',     delayedResize);
    observe(text, 'paste',   delayedResize);
    observe(text, 'drop',    delayedResize);
    observe(text, 'keydown', delayedResize);

    if (text) { 
        text.focus();
        text.select();
    }
    resize();
}


window.addEventListener('load', () => {
    const form = document.getElementById("sendMessage_form");
    if (form) { 
        form.addEventListener('submit', e => { e.preventDefault(); });

        const form_jquery = $('#sendMessage_form');

        form_jquery.on('submit', function (e) {
            e.preventDefault();
            $.ajax({
                url: '/bot-sendMessage',
                type: 'post',
                data: form_jquery.serialize(),
                success: function () {

                    console.log('SUBMITTED');
                    // Whatever you want to do after the form is successfully submitted
                }
            });
        });

        const textArea = $('#message');

        textArea.on('keydown' ,function (e) {

            if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
                form_jquery.trigger('submit');
            }
        });


    }

    setTimeout(() => {
        init();
    }, 500);
});


