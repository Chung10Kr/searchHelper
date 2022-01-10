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
        this.ajaxHtml( `${this.menuList[this.initMenu]["html"]}`  )

    }
    initEvent()
    {
        let self = this;
        $(".menuDoor").click(function(e){
            let targetKey = $(this).attr("data-key");
            self.ajaxHtml( `${self.menuList[targetKey]["html"]}`  );
        });

        $(window).on('load',function(){
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
    ajaxHtml(sHtml)
    {
        let self = this;
        $.ajax({ 
            type: 'post' , 
            url: `${sHtml}.html`, 
            dataType : 'html' , 
            success: function(data) {
                $("#container").html(data);
                self.setJs(sHtml);
                
            } 
        });
    }
    setJs(sHtml)
    {
        if( sHtml == 'history' ) new historyJs();
        if( sHtml == 'setting' ) new settingJs();
    }
    renderMenu()
    {
        let self = this;
        let str = Object.keys(this.menuList).map(function(key){
            let data = self.menuList[key];
            return `<li><a class="menuDoor" data-key="${key}" style="cursor: pointer;" >${data.name}</a></li>`;
        }).join("");
        $(".m_ul").append(str);
    };
}


$(function(){
    new optionsJs();
});
