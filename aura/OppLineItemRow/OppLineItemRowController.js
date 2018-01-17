/**
 * Created by pke on 12/28/17.
 */
({
    selectOppLine: function(component, event, helper) {
        var selectedOLI = event.getSource().get("v.text");
        component.getEvent("varOLISelEvent").setParams({
            "OLI": selectedOLI,
            "pageBlock": "oppLineItems"
        }).fire();
    }
})