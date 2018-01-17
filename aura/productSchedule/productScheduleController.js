({
   updateProdSchBtn : function(component, event, helper) {
     component.set("v.backBtnDis" , event.getParam("backBtnDis"));
     component.set("v.nextBtnDis" , event.getParam("nextBtnDis"));
     component.set("v.finishBtnDis" , event.getParam("saveBtnDis"));
     component.set("v.pageBlock" , event.getParam("pageBlock"));
     var forclose = component.find("opp-prod");
     if (component.get("v.pageBlock") == "prodSchItems") {
         //var forclose = component.find("opp-prod");
         $A.util.addClass(forclose, 'slds-hide');
         $A.util.removeClass(forclose, 'slds-show');
     } else {
         $A.util.addClass(forclose, 'slds-show');
         $A.util.removeClass(forclose, 'slds-hide');
     }
   },
   handleSelComEvent : function(component, event, helper) {
     var varOLISelEvent = event.getParam("OLI");
     component.set("v.selectedOLI" , varOLISelEvent);
   },
   doInit : function(component, event) {
     var url = window.location.href;
     var oppId = url.substring(url.indexOf("/sObject/")+9, url.indexOf("/view"));
     component.set("v.oppId" , oppId);
   },
   // this function automatic call by aura:waiting event
   showSpinner: function(component, event, helper) {
     // make Spinner attribute true for display loading spinner
     component.set("v.spinner", true);
   },
   // this function automatic call by aura:doneWaiting event
   hideSpinner : function(component,event,helper){
     // make Spinner attribute to false for hide loading spinner
     component.set("v.spinner", false);
   }

})