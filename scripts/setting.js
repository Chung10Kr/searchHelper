class settingJs
{
    constructor()
    {
        this.initControl();
        this.initEvent();
    };

    initControl()
    {
      this.getSearchEngene();
        
    }
    initEvent()
    {
        let self = this;
        this.sSE.onchange = () => { 
            this.setting();
        };
    }

    getSearchEngene(){
        this.sSE = document.getElementById("settingSearchEngene");
        chrome.storage.sync.get(['searchEngene'], function(result) {
            let type = result.searchEngene;
            $("#settingSearchEngene").val(type).prop("selected",true);
        });

        
    }


    setting()
    {
        let searchType= $("#settingSearchEngene").val();
        chrome.storage.sync.set({"searchEngene":searchType} );
    }
};
