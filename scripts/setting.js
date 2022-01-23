class settingJs
{
    constructor()
    {
        this.initControl();
        this.initEvent();
    };

    initControl()
    {
      this.getSettingOption();
      this.sSE = document.getElementById("settingSearchEngene");
      this.sE  = document.getElementsByName("settingEnroll");
    }

    initEvent()
    {
        let self = this;
        this.sSE.onchange = () => { 
            this.setting();
        };

        for(var i = 0; i < this.sE.length; i++){
            this.sE[i].onclick = () => {
                this.settingHis();
            };
        }
    }

    getSettingOption(){
        
        chrome.storage.sync.get(['searchEngene'], function(resuldatat) {
            let type = data.searchEngene;
            if(type != undefined){
                $("#settingSearchEngene").val(type).prop("selected",true);
            }
        });
        
        chrome.storage.sync.get(['logRecord'], function(data) {
            let his = data.logRecord;
            if(his != undefined){
                $(":radio[name='settingEnroll'][value='"+his+"']").attr('checked',his);
            }
        });

    }

    setting()
    {
        let searchEngene  = $("#settingSearchEngene").val();
        let searchUrl     = $("#settingSearchEngene > option:selected").attr("value2");
        let searchName    = $("#settingSearchEngene > option:selected").attr("value3");
        chrome.storage.sync.set({"searchEngene":searchEngene, "searchUrl":searchUrl, "searchName":searchName} );
    }

    settingHis()
    {
        let logRecord = $(".hisSetting:checked").val();
        chrome.storage.sync.set({"logRecord":logRecord});
    }
};
