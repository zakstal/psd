var cssViewer = require('./components/cssViewer/cssViewer.view');

module.exports = Ui = function () {};

Ui.prototype = {
    makeTag:  function (res) {
        console.log('make tag');
        var body = document.getElementsByTagName('body')[0];
        var psdImgContainer = this.createPsdImgContainer(res);
        var container = this.getContainerEl();
        container.appendChild(psdImgContainer);
        body.appendChild(container);
        //this.initCssViewer();
    },

    createPsdImgContainer: function (res) {
        var img = this.createEl('img');
        var parent = this.createEl('div');
        parent.classList.add('psd-main');
        parent.style.width = res.size.width;
        parent.style.height = res.size.height;
        img.src = res.img;
        parent.appendChild(img);
        return parent;
    },

    getContainerEl: function () {
        if (this.containerEl) {
            return this.containerEl;
        }

        this.containerEl = this.createEl('div');
        this.containerEl.classList.add('psd-container');

        return this.containerEl;
    },

    addImage: function (res) {
        var img = document.querySelectorAll('.psd-main img')[0];
        if (img) {
            console.log('addimage in img', img);
            img.src = res.src;
            return;
        }

        this.makeTag(res);
    },

    initCssViewer: function () {
        console.log('init viewer');
        var el = this.createEl('div');
        this.containerEl.appendChild(el);
        this.cssViewer = new cssViewer({
            el: el
        });
    },

    createEl: function (el) {
        return document.createElement(el);
    }
};