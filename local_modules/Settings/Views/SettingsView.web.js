// Copyright (c) 2014-2017, MyMonero.com
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//	conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//	of conditions and the following disclaimer in the documentation and/or other
//	materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//	used to endorse or promote products derived from this software without specific
//	prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
"use strict"
//
const View = require('../../Views/View.web')
const commonComponents_tables = require('../../WalletAppCommonComponents/tables.web')
const commonComponents_forms = require('../../WalletAppCommonComponents/forms.web')
const commonComponents_activityIndicators = require('../../WalletAppCommonComponents/activityIndicators.web')
const commonComponents_labeledRangeInputs = require('../../WalletAppCommonComponents/labeledRangeInputs.web')
const commonComponents_navigationBarButtons = require('../../WalletAppCommonComponents/navigationBarButtons.web')
//
class SettingsView extends View
{
	constructor(options, context)
	{
		super(options, context) // call super before `this`
		//
		const self = this 
		self.setup()
	}
	setup()
	{
		const self = this
		self.setup_views()
		self.startObserving()
	}
	setup_views()
	{
		const self = this
		{ // metrics / caches
			self.margin_h = 10
		}
		self._setup_self_layer()
		self._setup_validationMessageLayer()
		self._setup_form_containerLayer()
		// self.DEBUG_BorderChildLayers()
	}
	_setup_self_layer()
	{
		const self = this
		//
		self.layer.style.webkitUserSelect = "none" // disable selection here but enable selectively
		//
		self.layer.style.position = "relative"
		self.layer.style.width = `calc(100% - ${ 2 * self.margin_h }px)`
		self.layer.style.height = "100%" // we're also set height in viewWillAppear when in a nav controller
		self.layer.style.padding = `0 ${self.margin_h}px 0px ${self.margin_h}px` // actually going to change paddingTop in self.viewWillAppear() if navigation controller
		self.layer.style.overflowY = "scroll"
		//
		self.layer.style.backgroundColor = "#272527" // so we don't get a strange effect when pushing self on a stack nav view
		//
		self.layer.style.color = "#c0c0c0" // temporary
		//
		self.layer.style.wordBreak = "break-all" // to get the text to wrap
	}
	_setup_validationMessageLayer()
	{ // validation message
		const self = this
		const layer = commonComponents_tables.New_inlineMessageDialogLayer("")
		layer.ClearAndHideMessage()
		self.validationMessageLayer = layer
		self.layer.appendChild(layer)				
	}
	_setup_form_containerLayer()
	{
		const self = this
		const containerLayer = document.createElement("div")
		self.form_containerLayer = containerLayer
		{
			self._setup_form_field_changePasswordButton()
			// self._setup_form_field_serverURL() // TODO: to implement
			self._setup_form_field_appTimeoutSlider()
		}
		self.layer.appendChild(containerLayer)
	}
	_setup_form_field_changePasswordButton()
	{
		const self = this
		const div = commonComponents_forms.New_fieldContainerLayer()
		{
			const view = commonComponents_navigationBarButtons.New_GreyButtonView(self.context)
			view.layer.style.display = "inline-block"
			view.layer.style.padding = "0 10px"
			self.changePasswordButtonView = view
			view.layer.addEventListener("click", function(e)
			{
				e.preventDefault()
				// todo: change pw
				return false
			})
			// this will set its title on VWA
			div.appendChild(view.layer)
		}
		self.form_containerLayer.appendChild(div)
	}
	_setup_form_field_serverURL()
	{ // TODO: This hasn't really been implemented. It should have a 'Saving…' activity indicator to-design and should let the user know it will cause the removal of their wallets and they'll have to add them back after changing servers
		const self = this
		const div = commonComponents_forms.New_fieldContainerLayer()
		{
			const labelLayer = commonComponents_forms.New_fieldTitle_labelLayer("SERVER URL", self.context)
			div.appendChild(labelLayer)
			//
			const valueLayer = commonComponents_forms.New_fieldValue_textInputLayer({
				placeholderText: "Leave blank to use mymonero.com"
			})
			self.serverURLInputLayer = valueLayer
			valueLayer.addEventListener(
				"keyup",
				function(event)
				{
					console.log("Save server URL")
				}
			)
			div.appendChild(valueLayer)
		}
		self.form_containerLayer.appendChild(div)
	}
	_setup_form_field_appTimeoutSlider()
	{
		const self = this
		const div = commonComponents_forms.New_fieldContainerLayer()
		{
			const labelLayer = commonComponents_forms.New_fieldTitle_labelLayer("APP TIMEOUT", self.context)
			div.appendChild(labelLayer)
			//
			const view = commonComponents_labeledRangeInputs.New_fieldValue_timeBasedLabeledRangeInputView({
				min: 5,
				max: 60 * 20,
				//
				displayAsMinutesAfterXMin: 2,
				//
				isMaxInfinity: true,
				labelForInfinity: "Never",
				//
				changed_fn: function()
				{
					
				}
			}, self.context)
			self.appTimeoutRangeInputView = view
			div.appendChild(view.layer)
		}
		self.form_containerLayer.appendChild(div)
	}
	//
	startObserving()
	{
		const self = this
	}
	//
	//
	// Lifecycle - Teardown - Overrides
	//
	TearDown()
	{
		const self = this
		self.stopObserving()
		super.TearDown()
	}
	stopObserving()
	{
		const self = this
	}
	//
	//
	// Runtime - Accessors - Navigation
	//
	Navigation_Title()
	{
		return "Preferences"
	}
	//
	//
	// Runtime - Delegation - Navigation/View lifecycle
	//
	viewWillAppear()
	{
		const self = this
		super.viewWillAppear()
		{
			if (typeof self.navigationController !== 'undefined' && self.navigationController !== null) {
				self.layer.style.paddingTop = `${self.navigationController.NavigationBarHeight()}px`
				self.layer.style.height = `calc(100% - ${self.navigationController.NavigationBarHeight()}px)`
			}
		}
		{ // config change pw btn text
			const layer = self.changePasswordButtonView.layer
			const userSelectedTypeOfPassword = self.context.passwordController.userSelectedTypeOfPassword
			console.log("userSelectedTypeOfPassword" , userSelectedTypeOfPassword)
			const passwordType_humanReadableString = self.context.passwordController.HumanReadable_AvailableUserSelectableTypesOfPassword()[userSelectedTypeOfPassword]
			layer.innerHTML = "Change " + passwordType_humanReadableString
		}
		console.log(self.constructor.name + " viewWillAppear… subviews:", self.subviews)
	}
	viewDidAppear()
	{
		const self = this
		super.viewDidAppear()
		// teardown any child/referenced stack navigation views if necessary…
	}
}
module.exports = SettingsView