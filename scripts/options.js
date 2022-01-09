class optionsJs
{
    constructor()
    {
        this.initControl();
        this.initEvent();
    };

    initControl()
    {
        this.menuList = {
            "menu_1" : {"name":"History" , "html":"history"},
            "menu_2" : {"name":"Setting" , "html":"setting"},
        };
        this.initMenu = "menu_1";
        this.menuExpanded = false;
        this.renderMenu();
        $("#container").load(`${this.menuList[this.initMenu]["html"]}.html`);
    }
    initEvent()
    {
        let self = this;
        $(".menuDoor").on("click",function(e){
            let targetHtml = $(this).attr("data-link");
            $("#container").load(`${targetHtml}.html`)
        });
        if (navigator.userAgent.indexOf('iPhone')!=-1){
            addEventListener("load",function(){
                setTimeout(self.hideURLbar,0);
            },false);
        };

        $(window).load(function(){
            self.menuExpanded = false;
            $('.menu-inner').on('click', function(){
                if( self.menuExpanded == false){
                    $(this).parent().addClass('expanded');
                    self.menuExpanded = true;
                }else{
                    self.menuExpanded = false;
                    $(this).parent().removeClass('expanded');
                }
            });
        });
    }

    hideURLbar()
    {
	    window.scrollTo(0,1);
    };
    renderMenu()
    {
        let self = this;
        let str = Object.keys(this.menuList).map(function(key){
            let data = self.menuList[key];
            return `<li><a class="menuDoor" data-link="${data.html}" style="cursor: pointer;" >${data.name}</a></li>`;
        }).join("");
        $(".m_ul").append(str);
    };
}


$(function(){
    new optionsJs();
});
