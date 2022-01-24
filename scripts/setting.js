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
      this.defaultEngene = document.getElementById("defaultEngene");
      this.logStore = document.getElementById("switch");
    }

    initEvent()
    {
        let self = this;
        this.defaultEngene.onchange = () => { 
            self.setDefault();
        };

        this.logStore.onchange =() =>{
            self.logStore = $("#switch").is(":checked");
            self.setLogStore();
        };
    }

    async getSettingOption(){
        
        chrome.storage.sync.get(['defaultEngene'], function(data) {
            let type = data.defaultEngene;
            if(type != undefined){
                $("#defaultEngene").val(type).prop("selected",true);
            }
        });
        
        await chrome.storage.sync.get(['logStore'], function(data) {
            self.logStore = data.logStore || false;

            if( self.logStore ){
                $("#switch").attr('checked',true);
            }else{
                $("#switch").removeAttr("checked");
            };
        });

    }

    setDefault()
    {
        let defaultEngene  = $("#defaultEngene").val();
        let defaultUrl     = $("#defaultEngene > option:selected").attr("data-url");
        let defaultType    = $("#defaultEngene > option:selected").attr("data-type");
        chrome.storage.sync.set({"defaultEngene":defaultEngene, "defaultUrl":defaultUrl, "defaultType":defaultType} );
    }

    setLogStore()
    {
        let self = this;
        chrome.storage.sync.set( { "logStore" : self.logStore });
    }
};
