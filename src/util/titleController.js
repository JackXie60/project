const setTitle = Symbol('setTitle');
class TitleController {
    constructor() {
        this.siteTitle = "";
        this.RouteTitle = "";
    };
    [setTitle]() {
        const titleDom = document.head.querySelector("title");
        if (!this.RouteTitle && !this.siteTitle) {
            titleDom.innerText = "Loading";
        } else if (!this.siteTitle) {
            titleDom.innerText = this.RouteTitle;
        } else {
            titleDom.innerText = `${this.RouteTitle}-${this.siteTitle}`;
        }
    }
    setRouteTitle(routeTitle){
        this.RouteTitle = routeTitle;
        this[setTitle]();
    }
    setSiteTitle(siteTitle){
        this.siteTitle = siteTitle;
        this[setTitle]();
    }
}
export default new TitleController();