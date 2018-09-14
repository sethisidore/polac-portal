(function initEditableField() {
  // Usage:
  //
  // Creates:
  //

  angular
    .module('core')
    .component('editableField', {
      templateUrl: './app/core/editable-field/editable-field.html',
      controller: 'EditableFieldController',
      controllerAs: 'fieldfieldCtrl',
      bindings: {
        fieldValue: '<',
        fieldType: '@?',
        onUpdate: '&',
      },
    });

  EditableFieldController.$inject = [];
  function EditableFieldController() {
    const fieldCtrl = this;

    // //////////////

    fieldCtrl.$onInit = function activate() {
      fieldCtrl.editMode = false;

      // Make a copy of the initial value to be able to reset it later
      fieldCtrl.fieldValueCopy = fieldCtrl.fieldValue;

      // Set a default fieldType
      if (!fieldCtrl.fieldType) {
        fieldCtrl.fieldType = 'text';
      }
    };

    fieldCtrl.$onChanges = function handleModeChange() {
      if (fieldCtrl.editMode) {
        fieldCtrl.onUpdate({ value: fieldCtrl.fieldValue });
        fieldCtrl.fieldValueCopy = fieldCtrl.fieldValue;
      }
      fieldCtrl.editMode = !fieldCtrl.editMode;
    };

    fieldCtrl.$onDestroy = function reset() {
      fieldCtrl.fieldValue = fieldCtrl.fieldValueCopy;
    };
  }
}());
