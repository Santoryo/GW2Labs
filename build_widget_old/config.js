{
    __sveltekit_nxeon2 = {
        base: new URL(".", location).pathname.slice(0, -1)
    };

    const element = document.currentScript.parentElement;

    Promise.all([
        import("./_app/immutable/entry/start.QEKeLaIK.js"),
        import("./_app/immutable/entry/app.tMA4Cxs4.js")
    ]).then(([kit, app]) => {
        kit.start(app, element, {
            node_ids: [0, 2, 5],
            data: [null,null,null],
            form: null,
            error: null
        });
    });
}