{
    __sveltekit_nxeon2 = {
        base: ""
    };

    const element = document.currentScript.parentElement;

    Promise.all([
        import("/_app/immutable/entry/start.QEKeLaIK.js"),
        import("/_app/immutable/entry/app.tMA4Cxs4.js")
    ]).then(([kit, app]) => {
        kit.start(app, element);
    });
}