({
    // Load departments from Salesforce
    doInit: function(component, event, helper) {
        var next = false;
        var prev = false;
        helper.fetchDepartments(component,next,prev);
    },
    doNext:function(cmp,event,helper){
        var next = true;
        var prev = false;
        var offset = cmp.get("v.offset");
        helper.fetchDepartments(cmp,next,prev,offset); 
    },
    doPrevious:function(cmp,event,helper){
        var next = false;
        var prev = true;
        var offset = cmp.get("v.offset");
        console.log("offset value" + offset);
        helper.fetchDepartments(cmp,next,prev,offset); 
    },
    openModel: function(component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isOpen", true);
    },
    
    closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        component.set("v.isOpen", false);
    },
    
    clickCreate: function(component, event, helper) {
        var next = false;
        var prev = false;
        var validExpense = component.find('expenseform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validExpense){
            // Create the new expense
            var newExpense = component.get("v.Department");
            console.log("Create expense: " + JSON.stringify(newExpense));
            helper.createExpense(component, newExpense, true);
            helper.fetchDepartments(component,next,prev); 
        }
    },
    
    removeDeletedRow: function(component, event, helper) {
        // get the selected row Index for delete, from Lightning Event Attribute  
        var deleteRecord = event.getParam("DepartmentInstance");
        var jsonString = JSON.parse(JSON.stringify(deleteRecord));
        console.log(jsonString["Name"]);
        var offset = component.get("v.offset");
        var next = component.get("v.next");
        var prev = component.get("v.prev");
        helper.deleteDepartmentByName(component, jsonString["Name"], next, prev, offset);
        
    },
    saveEditRow: function(component, event, helper) {
        // Create the new expense
        var newExpense = event.getParam("DepartmentInstance");
        helper.createExpense(component, newExpense, false);
    },
    // this function automatic call by aura:waiting event  
    showSpinner: function(component, event, helper) {
        // make Spinner attribute true for display loading spinner 
        component.set("v.Spinner", true); 
    },
    
    // this function automatic call by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
        // make Spinner attribute to false for hide loading spinner    
        component.set("v.Spinner", false);
    }
})
